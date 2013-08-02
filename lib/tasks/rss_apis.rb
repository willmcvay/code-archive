require 'open-uri'
require 'rss'
namespace :rss_apis do
  desc "Testing out parsing with feedzirra "
  task :feed => :environment do
    @feed=Feedzirra::Feed.fetch_and_parse("http://feeds.feedblitz.com/SethsBlog")
    str_feed = open('http://feeds.feedblitz.com/SethsBlog').read
    @rss_url = nil
    str_feed.each_line do |l|
        puts l
        if (['application/atom','application/rss+'].include?('l'))
            binding.pry
            l_arr=l.split('"')
            l_arr.each do |string|
                if(string =~ /http:|https:/)
                    @rss_url = string
                    binding.pry
                end
            end
        end

        break if(@rss_url)

    end
    if(@rss_url)
        @feed=Feedzirra::Feed.fetch_and_parse(@rss_url)
    end

    binding.pry
  end

  task :rubyfeed => :environment do
        time = Time.now
        url ="http://feeds.feedblitz.com/SethsBlog"
        open(url) do |rss|
            binding.pry
            feed = RSS::Parser.parse(rss)

            @type=feed.feed_type
            if (@type == "atom")
                # do atom protocols
            elsif(@type == "rss")
                # do rss protocols
                puts "Title: #{feed.channel.title}"
                feed.items.each do |item|
                    puts "Item: #{item.title}"
                end
            end
        end
    end


end