# # Client

# require 'socket'

# server = TCPSocket.new 'localhost', 2000

# # 10.0.1.120
# while l = socket.gets
#     puts "Got: '#{l}'"
# end

# socket.close

# # Server

# require 'socket'

# server = TCPSocket.new 'localhost', 2000

# # listen()

# loop do 
#     puts "Server: Waiting for connection to port 2000"
#     connection = "Server: Got socket"
#     msg = connection.gets
#     puts "Server: received #{msg}"
#     connection.puts "Thanks for #{msg}"
#     connection.close
#     puts "Server: Closed"
# end

require 'socket'

server = TCPSocket.new 'localhost', 2000

# 10.0.1.120

sleep 5
socket.puts "Hi Tim"

while i socket.gets 
    puts "#{i}"
end

socket.close
