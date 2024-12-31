# Setup Instructions

To run this web application, follow the steps below:

### 1. Create an S3 Bucket in AWS
- Create a new bucket in AWS S3 to store images.
- Add the following keys to the `.env` file (place this file at the same level as the `src` folder inside the `server` folder):

  ```env
  AWS_BUCKET_REGION=
  AWS_BUCKET_ACCESS_KEY=
  AWS_BUCKET_SECRET_KEY=
  AWS_BUCKET_NAME=

### 2. Running Predict server
- Running predict server from folder model you get from us, by py server.py, then a server will running and its address is http://127.0.0.1:5000/.

### 3. Create the Client .env File
- Inside the client/src folder, create a .env file and add the following lines:
  
  ```env
  REACT_APP_BASE_URL=http://localhost:4000/api/v1/
  REACT_APP_ESTIMATE_SERVER_URL=http://127.0.0.1:5000/

### 4. Run the Web Application
- A webpage will run on http://localhost:3000/, this is the demo web.

If you dont want to run the web, I will show you a brief description about it below

# Brief Description
![homepage](https://github.com/user-attachments/assets/49a136c1-6d5e-42a6-80c2-9e529952b15e)

## Project Description

Future Estate is a real estate platform based in Singapore, utilizing a Random Forest model to estimate property prices. This feature helps buyers conveniently estimate their budgets and assists sellers in creating and pricing their listings effectively.

## Features

- **Property Price Estimation**: The platform leverages a Random Forest model to estimate the price of properties based on various factors. This helps buyers get an accurate idea of market prices and assists sellers in pricing their properties competitively.

## Demo

  - Homepage
    ![homepage](https://github.com/user-attachments/assets/15ec62fe-beb7-4c8b-a2d2-a6064e56d2cd)

  - Appraisal
    User can input all the feature here then submit
    ![appraisal-before](https://github.com/user-attachments/assets/70e4357b-dba1-46c5-af1e-28fa32c71796)

    The price will be estimate and show them
    ![appraisal-after](https://github.com/user-attachments/assets/930d06f1-6d6c-4dfb-b326-ec83ab0ab056)

  - Agents
    ![agents](https://github.com/user-attachments/assets/5610f582-29c0-4e42-8c8c-bd6b598e876f)

  - Stories
    ![stories](https://github.com/user-attachments/assets/e5dd5300-9e87-4151-bc17-9ac85f4e3f0b)

  - Properties
    ![properties](https://github.com/user-attachments/assets/d59cc696-3130-4d1a-bf34-617376f7ab27)

  - Property Detail
    ![properties-detail](https://github.com/user-attachments/assets/b22ba3f3-6ad6-4e52-bc2f-27dc57eb3899)

  - Dashboard
    ![dashboard](https://github.com/user-attachments/assets/1068b0ef-3931-41c4-a2d1-72aab6081c8c)

  - Estate
    ![dashboard-estate](https://github.com/user-attachments/assets/ceeadef6-7961-4a20-95df-dd4ef0591196)
  
  - Signin
    ![signin](https://github.com/user-attachments/assets/6c084268-b64e-4143-8ffa-3378437593bc)

  - Signup
    ![signup](https://github.com/user-attachments/assets/0c11b32f-8640-4904-beae-27ff9ff25e06)

## Technologies Used

- **Frontend**: 
  - React
  - Redux
  - Material-UI
  - Axios

- **Backend**:
  - Node.js
  - Flask
  - Express
  - MongoDB
  - AWS: S3
 

