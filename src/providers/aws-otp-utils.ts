import { Injectable } from '@angular/core';
import *  as AWS from 'aws-sdk';

@Injectable()
export class AwsOTPUtils {

    private topicARN: any;
    private subscriptionARN: any;
    constructor() {
    }

    initAWSWithCrdedentials(): Promise<any> {
        return new Promise((resolve, reject) => {
            AWS.config.update({ region: 'us-east-1' });
            let params = {
                IdentityPoolId: "us-east-1:2b74683b-8b3d-4341-8555-4eed3735be80"
            };
            let credentials = new AWS.CognitoIdentityCredentials(params);
            AWS.config.credentials = credentials;
            resolve()
        });
    }

    getTopics(): Promise<any> {
        return new Promise((resolve, reject) => {
            let createTopicPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).listTopics({}).promise();
            // Handle promise's fulfilled/rejected states
            createTopicPromise.then((data) => {
                this.topicARN = data.Topics[0].TopicArn;
                resolve(data);
            }, err => {
                console.error(err, err.stack);
                resolve(err);
            });
        });
    }

    createSubscription(phoneNumber: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let params = {
                Protocol: 'sms', /* required */
                TopicArn: this.topicARN, /* required */
                Endpoint: phoneNumber
            };
            // Create promise and SNS service object
            let subscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).subscribe(params).promise();
            // Handle promise's fulfilled/rejected states
            subscribePromise.then((data) => {
                this.subscriptionARN = data.SubscriptionArn;
                resolve();
            }, err => {
                console.error(" error at create subscription", err, err.stack);
            });
        });
    }

    publishSubscription(): Promise<any> {
        return new Promise((resolve, reject) => {
            let otp: string = (Math.floor(Math.random() * 1000000) + 1).toString();
            let publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish({
                Message: "You OTP for Okro is " + otp, /* required */
                TopicArn: this.topicARN
            }).promise();
            // Handle promise's fulfilled/rejected states
            publishTextPromise.then((data) => {
                    //console.log("Message ${params.Message} send sent to the topic ${params.TopicArn}", otp);
                    //console.log("MessageID is " + data.MessageId);
                    resolve(otp);
                    }, (err) => {
                        console.error(err, err.stack);
                    });
        });
    }

    deleteSubscription(): Promise<any> {
        return new Promise((resolve, reject) => {
            let unsubscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).unsubscribe({ SubscriptionArn: this.subscriptionARN }).promise();
            // Handle promise's fulfilled/rejected states
            unsubscribePromise.then((data) => {
                console.log(data);
                resolve();
            }, err => {
                console.error(err, err.stack);
            });
        });
    }
}
