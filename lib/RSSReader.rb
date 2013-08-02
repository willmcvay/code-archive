class RSSReader

    # Since the execution time is too slow, this will be run in a thread.
    # Later on to update a page we might need javascript.
    def create_rss_feed(url)
        # url ="http://feeds.feedblitz.com/SethsBlog"
        time = Time.now
        url = "http://sethgodin.typepad.com/"
        home_url =  "http://sethgodin.typepad.com/"
        doc = open(url)
        puts "Time to open a url is: #{Time.now-time}"
        if(doc.content_type == "text/html")
            url=get_rss_feed(doc)
            feed=Feed.where(url: url)
            puts Time.now-time
            binding.pry
        end
        open(url) do |rss|
            time = Time.now
            feed = RSS::Parser.parse(rss)
            binding.pry
            puts "Time to parse a url feed is #{Time.now-time}"
            @type=feed.feed_type
            if (@type == "atom")
                attributes = {
                    title: feed.title.content,
                    feed_url: feed.link.href,
                    url: url,
                    last_modified: feed.updated.content,
                    etag: ""}
                c_feed = Feed.create(attributes)
                binding.pry if false
                # do atom protocols
            elsif(@type == "rss")
                # do rss protocols
                puts "Title: #{feed.channel.title}"
                feed.items.each do |item|
                    puts "Item: #{item.title}"
                end
            end
            binding.pry if false
        end
        puts Time.now-time
    end

    def get_rss_feed(file)
        str_feed = file.read

        rss_url = nil
        str_feed.each_line do |l|

            # Checks if the line includes either of these.
            if (l.include?('application/atom') || l.include?('application/rss'))
                l_arr=l.split('"')
                l_arr.each do |string|
                    if(string =~ /http:|https:/)
                        rss_url = string

                    end
                end
            end
            break if(rss_url)
        end

        return rss_url
    end
end