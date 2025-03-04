import http.server
import socketserver
import os

os.chdir(os.path.join(os.path.dirname(__file__), '../frontend'))

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
