class User
  attr_reader :login, :c

  def initialize xml
    @xml = xml
    parse 
  end

  def parse 
    @login = @xml.xpath("login").text
    @c = @xml.xpath("c").text 
  end 
end