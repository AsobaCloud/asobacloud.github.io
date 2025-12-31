module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      index = []
      
      site.pages.each do |page|
        # Skip non-markdown/html pages
        next unless page.ext == '.md' || page.ext == '.html'
        next if page.path.start_with?('_')
        next if page.path == 'search-index.json'
        
        # Extract content
        content = page.content
        # Remove HTML tags
        content = content.gsub(/<[^>]*>/, '')
        # Remove markdown links but keep text
        content = content.gsub(/\[([^\]]+)\]\([^\)]+\)/, '\1')
        # Remove code blocks (keep inline code)
        content = content.gsub(/```[\s\S]*?```/, '')
        # Clean up whitespace
        content = content.gsub(/\s+/, ' ').strip
        
        # Build hierarchy from URL path
        path_parts = page.url.split('/').reject(&:empty?)
        hierarchy = nil
        section = path_parts[0] || 'Home'
        
        if path_parts.length > 1
          # Build hierarchy like "Guides > Forecasting > Generating Forecasts"
          hierarchy_parts = []
          path_parts[0..-2].each_with_index do |part, idx|
            # Capitalize and format
            formatted = part.split('-').map(&:capitalize).join(' ')
            hierarchy_parts << formatted
          end
          hierarchy = hierarchy_parts.join(' > ') if hierarchy_parts.any?
        end
        
        # Get title
        title = page.data['title'] || page.name.gsub(/\.(md|html)$/, '').split('-').map(&:capitalize).join(' ')
        
        index << {
          'title' => title,
          'url' => page.url,
          'content' => content[0..500], # First 500 chars
          'hierarchy' => hierarchy,
          'section' => section.capitalize
        }
      end
      
      # Write to JSON file in site root
      FileUtils.mkdir_p(site.dest) unless File.directory?(site.dest)
      json_path = File.join(site.dest, 'search-index.json')
      File.write(json_path, index.to_json)
      
      Jekyll.logger.info "Search Index:", "Generated #{index.length} entries"
    end
  end
end
