class Gitapi

  URL = "https://api.github.com/users"

  attr_reader :users, :search 

  def initialize search
    @search = search
    @users = [] 
    values = {owner: search, type: "xml"} 
    url = [URL, "?", values.to-query].join 
    response = HTTParty.get(url).body 
    xml = Nokogiri::XML(response) 
    xml.xpath("/repos/:owner/:repo/stats/contributors").each do |item|
    @users << User.new(item) 
    end
  end
end