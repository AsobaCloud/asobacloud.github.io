## Step-by-Step Guide: Moving the Workflow to Amazon SageMaker

---

### Overview
This workflow will involve the following steps in SageMaker:
1. **API Gateway Trigger**: Starts the workflow by invoking a SageMaker Pipeline.
2. **Data Ingestion and Preprocessing with SageMaker Processing**: Replaces `ingestHistoricalLoadData` Lambda, processing data from an S3 source and outputting preprocessed data back to S3.
3. **Model Training with SageMaker Training Jobs**: Replaces `trainForecastModel` Lambda by executing model training on processed data.
4. **Instance Lifecycle Management and Monitoring**: Handled by SageMaker, with training job start and stop based on pipeline configuration.

### Workflow Steps with SageMaker Components

1. **Define the Workflow in SageMaker Pipelines**:
   - We’ll set up a **SageMaker Pipeline** to orchestrate the workflow, which includes data preprocessing, model training, and storage of model artifacts. Each Lambda step will be translated into a corresponding SageMaker step.

### Step 1: Create API Gateway to Trigger the SageMaker Pipeline

1. **Setup API Gateway**:
   - Create an API endpoint in API Gateway to trigger the workflow.
   - Configure a **POST endpoint** with parameters for `Customer ID`, `data location`, and `configuration parameters`.
2. **Lambda as Intermediary (Optional)**:
   - API Gateway can invoke a Lambda function to preprocess the input or trigger the SageMaker Pipeline directly. This Lambda function could also validate inputs before starting the SageMaker Pipeline.

### Step 2: Data Ingestion and Preprocessing with SageMaker Processing Job

The `ingestHistoricalLoadData` Lambda’s functionality can be translated into a SageMaker Processing job.

1. **Create a SageMaker Processing Job**:
   - **Script**: Move the data preprocessing logic (initial loading, database interactions, column renaming, type conversions, and device registration) to a Python script in SageMaker.
   - **Environment**: Configure PostgreSQL credentials as environment variables. If external libraries (like `psycopg2`) are required, package them in a Docker image or include them in the SageMaker Processing job’s requirements.
   
2. **Sample SageMaker Processing Script**:
   - Here is a simplified script that performs similar tasks as `ingestHistoricalLoadData`:

   ```python
   import os
   import pandas as pd
   import boto3
   from sqlalchemy import create_engine, text as sql_text
   from custom_preprocessing import preprocess_data  # Add manufacturer-specific preprocessing

   # Environment variables and configurations
   DB_HOST = os.environ['DB_HOST']
   DB_USER = os.environ['DB_USER']
   DB_PASS = os.environ['DB_PASSWORD']
   S3_BUCKET = 'api-int-ingest'
   OUTPUT_BUCKET = 'asoba-client-output'

   # Setup DB connection
   def get_db_engine():
       return create_engine(f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}")

   def main():
       # Load data from S3
       s3 = boto3.client('s3')
       obj = s3.get_object(Bucket=S3_BUCKET, Key='path/to/file.csv')
       df = pd.read_csv(obj['Body'])
       
       # Preprocess data
       df = preprocess_data(df)
       
       # Save preprocessed data back to S3
       output_key = 'processed/path/output.csv'
       df.to_csv(f"s3://{OUTPUT_BUCKET}/{output_key}", index=False)

   if __name__ == "__main__":
       main()
   ```

3. **SageMaker Processing Job Configuration**:
   - Define inputs and outputs, point to your Docker image if custom dependencies are required, and specify IAM roles for S3 and database access.
   - **Output**: Save the processed CSV to a specified S3 location for the next stage.

### Step 3: Model Training with SageMaker Training Job

This step corresponds to the `trainForecastModel` Lambda and initiates model training on the preprocessed data in SageMaker.

1. **Create a SageMaker Training Job**:
   - Use a **SageMaker Training Job** to train the model on the processed dataset.
   - **Training Script**: Port the training logic (model setup, training, validation, and saving outputs) to SageMaker. Save artifacts (e.g., model file and normalization parameters) to an S3 bucket upon completion.
   
2. **Training Script Example**:
   ```python
   import os
   import pandas as pd
   import boto3
   from sklearn.ensemble import RandomForestRegressor
   from joblib import dump

   def main():
       s3 = boto3.client('s3')
       # Download preprocessed data from S3
       response = s3.get_object(Bucket='asoba-client-output', Key='processed/path/output.csv')
       df = pd.read_csv(response['Body'])
       
       # Define and train the model
       X, y = df.drop(columns=['target']), df['target']
       model = RandomForestRegressor().fit(X, y)
       
       # Save model to S3
       dump(model, '/opt/ml/model/model.joblib')
   
   if __name__ == "__main__":
       main()
   ```
   
3. **Output**: Configure the training job to store model artifacts and normalization parameters back to S3.

### Step 4: Monitoring and Lifecycle Management within SageMaker

1. **Handling Inactivity**:
   - Rather than managing EC2 instances directly, SageMaker manages the lifecycle of the training and processing instances. Each job in SageMaker only runs for the duration of its task, eliminating the need for explicit instance start/stop.
   
2. **Incorporating Model Monitoring (Optional)**:
   - Use **SageMaker Model Monitor** to track drift in input data distributions or model performance. Set up monitoring jobs for periodically checking and validating the model using SageMaker if ongoing validation is needed.

### Step 5: Create and Define the SageMaker Pipeline

1. **Create the Pipeline with the Following Steps**:
   - **Processing Step**: Data ingestion and preprocessing job.
   - **Training Step**: Model training job using the processed data.
2. **Define Dependencies**:
   - Use `sagemaker.workflow.steps` to sequence the steps so that the training job depends on the output of the processing job.
3. **Pipeline Code**:
   ```python
   from sagemaker.workflow.steps import ProcessingStep, TrainingStep
   from sagemaker.workflow.pipeline import Pipeline

   # Define processing and training steps here
   processing_step = ProcessingStep(
       name="DataIngestionStep",
       processor=my_processor,
       inputs=[...],
       outputs=[...]
   )
   training_step = TrainingStep(
       name="ModelTrainingStep",
       estimator=my_estimator,
       inputs={'train': s3_input_path}
   )

   # Create a SageMaker Pipeline
   pipeline = Pipeline(
       name="DataIngestionAndTrainingPipeline",
       steps=[processing_step, training_step]
   )

   pipeline.upsert(role_arn="arn:aws:iam::account-id:role/SageMakerRole")
   pipeline.start()
   ```

4. **Pipeline Execution**:
   - The API Gateway or a Lambda function can invoke the pipeline, triggering the end-to-end workflow.

### Step 6: IAM Roles and Permissions

1. **Roles for Pipeline Components**:
   - **Processing Job Role**: Permissions to read/write S3 and access the database.
   - **Training Job Role**: Permissions to read S3 and save model artifacts.
   - **Pipeline Execution Role**: This role will manage permissions across steps and provide access to S3.

2. **Least Privilege Access**:
   - Assign minimal permissions to each role, ensuring that only necessary access is granted.

### Step 7: Testing and Monitoring

1. **Testing**:
   - Submit a request through API Gateway, initiating the workflow.
   - Monitor each stage in SageMaker to verify the successful execution of data preprocessing, training, and artifact storage.

2. **Monitoring**:
   - Use **SageMaker’s built-in monitoring** for each job (processing, training).
   - Set up **CloudWatch Alarms** for completion or failure notifications.

### Final Thoughts

This workflow uses SageMaker's capabilities to manage instance provisioning and termination, handle processing and training tasks, and simplify the complexity of direct EC2 and SQS handling. By utilizing SageMaker Pipelines, you can monitor, log, and manage each step effectively, while SageMaker’s instance management ensures cost-efficient scaling and operation.

