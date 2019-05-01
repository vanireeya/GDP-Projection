# GDP-Projection
Node.js (backend) and React (frontend) based application to show the GDP growth of U.S.A for the past 60 years.

### Backend: NodeJs:
Backend services requests for data for GDP of USA for past 60 years. This is implemented by calling the given API. This is a high latency request, since first the request comes to the server and then the server calls the API. Hence to decrease the latency, I have used Redis Cache to bypass repeated API calls. I have used to winston library to log the server activities. The logs are mentioned in two separate files: 1. For server activities and 2. For logging exceptions. 

### Frontend: ReactJs:
Frontend calls the backend API which returns the GDP data of U.S.A. for past 60 years. It displays this data in form of line graph. On hovering on the dots of the line graph, you can get the exact GDP value for a particular year. On hovering over the line, it will show USA's increasing trends. 

The Homepage of the application:
![HomePage](https://github.com/vanireeya/GDP-Projection/tree/master/Screenshots/HomePage.png)

Hover on the graph dots:
![HomePage](https://github.com/vanireeya/GDP-Projection/tree/master/Screenshots/Hoverondots.png)

Hover on the line:
![HomePage](https://github.com/vanireeya/GDP-Projection/tree/master/Screenshots/Hoveronline.png)

