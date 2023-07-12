# Lambda Puppeteer

This is an example repository of running [container image](https://www.docker.com/) based [AWS Lambda](https://aws.amazon.com/ko/lambda/) function containing [puppeteer](https://pptr.dev/).

# What tech stacks used & what it actually does
![crawler.drawio.png](assets/crawler.drawio.png)
1. Node.js
    > Node.js® is an open-source, cross-platform JavaScript runtime environment. [^1]
2. Puppeteer
    > Puppeteer is a Node.js library which provides a high-level API to control Chrome/Chromium over the DevTools Protocol. [^2]
3. AWS Lambda
    > AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers. [^3]
4. Docker
    > Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. [^4]
5. AWS Serverless Application Model
    > The AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications. It provides shorthand syntax to express functions, APIs, databases, and event source mappings. With just a few lines per resource, you can define the application you want and model it using YAML. During deployment, SAM transforms and expands the SAM syntax into AWS CloudFormation syntax, enabling you to build serverless applications faster. [^5]
6. Git Submodules
    > Submodules allow you to keep a Git repository as a subdirectory of another Git repository. This lets you clone another repository into your project and keep your commits separate. [^6]
7. AWS Event Bridge
    > EventBridge is a serverless service that uses events to connect application components together, making it easier for you to build scalable event-driven applications. Use it to route events from sources such as home-grown applications, AWS services, and third-party software to consumer applications across your organization. [^7]
8. CloudWatch and SNS will be implemented later.

tl;dr? Long story short, it is an AWS SAM template defining an AWS Lambda function based on a Docker container image. The image is a Node.js app with chrome installed. The app uses Puppeteer to execute a crawling job. The function is invoked periodically by an AWS Event Bridge schedule which is also defined in the template. And by using Git Submodules, it can import the code with business logic from a personal private repository.

[^1]: https://nodejs.org/en
[^2]: https://pptr.dev/
[^3]: https://aws.amazon.com/lambda/?nc1=h_ls#How_it_works
[^4]: https://docs.docker.com/get-docker/#title
[^5]: https://aws.amazon.com/serverless/sam/
[^6]: https://git-scm.com/book/en/v2/Git-Tools-Submodules#_git_submodules
[^7]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html