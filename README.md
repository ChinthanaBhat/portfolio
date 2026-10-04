# Portfolio with a serverless visitor counter

Personal portfolio of **Chinthana G Bhat**, an MCA student at Bangalore Institute of Technology working toward a full stack Java developer role.

**Live site:** https://chinthanabhat.github.io/portfolio/

The page is plain HTML, CSS and JavaScript, hosted on GitHub Pages. The visitor counter in the footer is a small serverless backend on AWS, which I built to learn the basics of AWS.

## How the visitor counter works

```
Browser  -->  Lambda Function URL  -->  Lambda (Python)  -->  DynamoDB
```

1. When the page loads, `script.js` sends a GET request to a Lambda Function URL.
2. The Lambda function (Python) adds 1 to a `visits` value in a DynamoDB table using a single `UpdateItem` call.
3. The function returns the new total as JSON, for example `{"count": 42}`, and the page shows it in the footer.
4. If the request fails, the page shows "N/A" instead of breaking.

## AWS services used

| Service | What it does here |
|---|---|
| Lambda | Runs the Python function that updates the counter |
| DynamoDB | Stores the visit count (on-demand capacity, one item) |
| IAM | An inline policy on the function's role allows `dynamodb:UpdateItem` on this one table |
| Function URL | Gives the function a public HTTPS endpoint, with CORS enabled for the browser |
| S3 | Holds a copy of the site files |
| Budgets | Monthly cost alerts so a learning account stays cheap |

## Lambda code

```python
import json, boto3

table = boto3.resource("dynamodb").Table("visitor-count")

def lambda_handler(event, context):
    r = table.update_item(
        Key={"id": "site"},
        UpdateExpression="ADD visits :inc",
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW",
    )
    return {"statusCode": 200, "body": json.dumps({"count": int(r["Attributes"]["visits"])})}
```


## What I learned

- How IAM permissions work, and why a function should only be allowed the actions it needs
- Why a serverless setup suits a small workload like a counter
- What CORS is, and why a browser needs it to call another origin
- How to set budgets and MFA so a learning account stays safe
- How to work around a blocked step: AWS held my CloudFront distribution for account verification, so I hosted the page on GitHub Pages and kept the AWS backend

## Next steps

- Serve the site from S3 through CloudFront (private bucket with origin access control) once the account is verified
- Rewrite the Lambda function in Java, using Maven and the AWS SDK v2
- Restrict the Function URL's CORS setting to the live site's address
- Deploy automatically with GitHub Actions

## Project files

```
index.html   page content
style.css    styling
script.js    calls the counter and shows the number
```

## Contact

chinthanagbhat@gmail.com | [LinkedIn](https://www.linkedin.com/in/chinthanabhat) | [GitHub](https://github.com/ChinthanaBhat)
