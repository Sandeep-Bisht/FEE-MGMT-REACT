import React, {
  Component
} from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import Moment from 'moment';
class FeesImport extends Component {
  onDrop(files) {
    this.setState({
      files
    });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        console.log(data.length)
        var userList = [];
        for (var j = 17200; j < 17245; j=j+100) {
        //   var AcademicuserList = [];
        for (var i = j; i < j+45; i++) {
          var session = '2020-2021';
          var unique_id = "2020-2021" + data[i][94];
          var class_name;
          if (data[i][86] == "1") {
            class_name = "PRE-NUR";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "2800",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "2") {
            class_name = "NUR";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "2800",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "3") {
            class_name = "K.G.";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "2800",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "4") {
            class_name = "1";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "2900",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "5") {
            class_name = "2";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "2900",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "6") {
            class_name = "3";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "2950",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "7") {
            class_name = "4";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "2950",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "8") {
            class_name = "5";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "9") {
            class_name = "6";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "10") {
            class_name = "7";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3150",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "11") {
            class_name = "8";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3150",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "12") {
            class_name = "9SCI";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3300",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "500",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "13") {
            class_name = "9COM";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3300",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "500",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "14") {
            class_name = "10COM";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3300",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "3505",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "15") {
            class_name = "10SCI";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3300",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "3505",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "16") {
            class_name = "11SCI";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3600",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "17") {
            class_name = "11COM";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3400",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "18") {
            class_name = "12SCI";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3600",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          } else if (data[i][86] == "19") {
            class_name = "12COM";
            var fees = [{
              "_id": "5fe09ec686874c24e42747a4",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-21T13:10:30.765Z",
              "updatedAt": "2021-02-13T08:53:14.745Z",
              "__v": 0
            }, {
              "_id": "5fe1bd080b67b2407a591a8b",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": "0",
              "month": "4",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T09:31:52.940Z",
              "updatedAt": "2021-02-13T08:53:48.099Z",
              "__v": 0
            }, {
              "_id": "5fe1c3ad0b67b2407a591a8c",
              "fee_category": "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": "0",
              "month": "7",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T10:00:13.414Z",
              "updatedAt": "2021-02-13T08:53:58.084Z",
              "__v": 0
            }, {
              "_id": "5fe1d8bf0b67b2407a591a8e",
              "fee_category": "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": "100",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:30:07.592Z",
              "updatedAt": "2021-02-13T08:55:50.754Z",
              "__v": 0
            }, {
              "_id": "5fe1ddb90b67b2407a591a8f",
              "fee_category": "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": "500",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:51:21.383Z",
              "updatedAt": "2020-12-22T11:51:21.383Z",
              "__v": 0
            }, {
              "_id": "5fe1dde30b67b2407a591a90",
              "fee_category": "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": "5000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:52:03.101Z",
              "updatedAt": "2020-12-22T11:52:03.101Z",
              "__v": 0
            }, {
              "_id": "5fe1de1d0b67b2407a591a91",
              "fee_category": "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": "10000",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:53:01.630Z",
              "updatedAt": "2020-12-22T11:53:01.630Z",
              "__v": 0
            }, {
              "_id": "5fe1de880b67b2407a591a92",
              "fee_category": "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": "0",
              "month": "9",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:54:48.947Z",
              "updatedAt": "2021-02-13T08:59:45.655Z",
              "__v": 0
            }, {
              "_id": "5fe1dec00b67b2407a591a93",
              "fee_category": "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": "0",
              "month": "11",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:55:44.198Z",
              "updatedAt": "2021-02-13T09:12:42.001Z",
              "__v": 0
            }, {
              "_id": "5fe1defa0b67b2407a591a94",
              "fee_category": "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": "0",
              "month": "1",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T11:56:42.457Z",
              "updatedAt": "2021-02-13T09:13:19.036Z",
              "__v": 0
            }, {
              "_id": "5fe1e77f0b67b2407a591a97",
              "fee_category": "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": "3400",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2020-12-22T12:33:03.528Z",
              "updatedAt": "2020-12-22T12:33:03.528Z",
              "__v": 0
            }, {
              "_id": "60081edd7334e9721aca1ed0",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:25.990Z",
              "updatedAt": "2021-02-13T09:13:42.198Z",
              "__v": 0
            }, {
              "_id": "60081efe7334e9721aca1ed3",
              "fee_category": "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "0",
              "month": "12",
              "status": "ACTIVE",
              "createdAt": "2021-01-20T12:15:58.796Z",
              "updatedAt": "2021-02-13T09:14:03.312Z",
              "__v": 0
            }, {
              "_id": "600a4bb37334e9721aca1ed5",
              "fee_category": "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:15.051Z",
              "updatedAt": "2021-01-30T11:34:28.468Z",
              "__v": 0
            }, {
              "_id": "600a4bcd7334e9721aca1ed6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": "0",
              "month": "8",
              "status": "ACTIVE",
              "createdAt": "2021-01-22T03:51:41.496Z",
              "updatedAt": "2021-01-22T03:51:41.496Z",
              "__v": 0
            }, {
              "_id": "6014f5c77a2ced6dcd76b067",
              "fee_category": "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-01-30T05:59:35.099Z",
              "updatedAt": "2021-01-30T05:59:35.099Z",
              "__v": 0
            }, {
              "_id": "603c7569dfedd67c7907a6c6",
              "fee_category": "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": "0",
              "month": "",
              "status": "ACTIVE",
              "createdAt": "2021-03-01T05:02:33.771Z",
              "updatedAt": "2021-03-01T05:02:33.771Z",
              "__v": 0
            }]
          }
          // const phoneNumber = data[i][1];
          const admission_no = data[i][12];
          const receipt_no = data[i][94];
          const section = data[i][87];
          const account_no = data[i][52];
          const receipt_date = Moment(data[i][96]).format("YYYY-MM-DD");
          const defaulter_month = Moment(data[i][96]).format("M");
          const name = data[i][16];
          const fine = data[i][118];
          const paid_amount = data[i][121];
          const grand_total = data[i][133];
          const payment_mode = "BANK";
          const balance = parseInt(-data[i][122]) + parseInt(data[i][123])

          const fee_concession = data[i][29];
          var is_full_free_ship;
          if (data[i][33] == "0") {
            is_full_free_ship = "false";
          } else {
            is_full_free_ship = "true";
          }
          var is_teacher_ward;
          if (data[i][34] == "0") {
            is_teacher_ward = "false";
          } else {
            is_teacher_ward = "true";
          }
          var take_computer;
          if (data[i][37] == "0") {
            take_computer = "false";
          } else {
            take_computer = "true";
          }
          const prospectus_fee = data[i][99];
          const registration_fee = data[i][100];
          const admission_fee = data[i][101];
          const security_fee = data[i][102];

          const total_one_time_fee = data[i][103];
          const total_annual_fee = data[i][112];
          const total_monthly_fee = data[i][120];
          const paid_month = Moment(data[i][98]).format("M")

          const last_fee_date = Moment(data[i][98]).format("YYYY-MM-DD");
          var bank;
          if (data[i][93] == "3220") {
            bank = "PNB"
          } else {
            bank = "SBI"
          }

          const paid_fees = [{
            'tuition_fee': data[i][113],
            'fee_month': Moment(data[i][98]).format("M"),
            'annual_fees': data[i][112],
            'one_time': data[i][103]
          }]


          const Allfees = [{
              'fee_category': "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": data[i][104],
              "month": "4"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": data[i][105],
              "month": "4"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": data[i][106],
              "month": "7"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": data[i][107],
              "month": "9"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": data[i][108],
              "month": "11"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": data[i][109],
              "month": "1"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": data[i][114],
              "month": "8"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "",
              "month": "12"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": '',
              "month": "8"
            },
            {
              'fee_category': "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": data[i][110],
              "month": "8"
            },
            {
              'fee_category': "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": data[i][99],
              "month": ""
            },
            {
              'fee_category': "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": data[i][100],
              "month": ""
            },
            {
              'fee_category': "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": data[i][101],
              "month": ""
            }, {
              'fee_category': "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": data[i][102],
              "month": ""
            },
           
           
            {
              'fee_category': "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": data[i][113],
              "month": ""
            },
            {
              'fee_category': "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "",
              "month": ""
            },
             {
              'fee_category': "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": data[i][119],
              "month": "4"
            },
          ]
          const newUser = {
            "school_id": "UT015",
            "receipt_no": receipt_no,
            "session": "2020-2021",
            'class_name': class_name,
            'section': section,
            'account_no': account_no,
            'admission_no': admission_no,
            'name': name,
            "receipt_date": Moment(receipt_date).format("YYYY-MM-DD"),
            'paid_fees': JSON.stringify(paid_fees),
            "Allfees": JSON.stringify(Allfees),
            "bank": bank,
            "last_fee_date": last_fee_date,
            "fine": fine,
            'payment_mode': payment_mode,
            'total_one_time_fee': total_one_time_fee,
            "total_annual_fee": total_annual_fee,
            'total_monthly_fee': total_monthly_fee,
            "balance": balance,
            "paid_amount": paid_amount,
            "grand_total": grand_total,
            "prospectus_fee": prospectus_fee,
            "registration_fee": registration_fee,
            "admission_fee": admission_fee,
            "security_fee": security_fee,
            "defaulter_month": defaulter_month,
            "paid_month": paid_month,
            "fees": JSON.stringify(fees),
            "take_computer": take_computer,
            "is_teacher_ward": is_teacher_ward,
            'is_full_free_ship': is_full_free_ship,
            "fee_concession": fee_concession,
            "unique_id": unique_id
          }
          userList.push(newUser);
        }
        const dataa = new FormData()
        console.log(userList.length)
        dataa.append('AllFeeData', JSON.stringify(userList))
        // dataa.append('StudentAcademicData', JSON.stringify(AcademicuserList))
        const url = "http://144.91.210.221:4800/Importallfees"
        fetch(url, {
            // headers : { 
            //   'Content-Type':'application/json',
            //   'Accept':'application/json'
            // },
            method: 'post',
            body: dataa
          })
          .then(res => res.json())
          .then(dataa => {
            // alert("Promote Successfully")
            // this.setState({session:this.state.to_session})           
          }).catch(err => {});
          userList= []
      }
      
        // console.log("old data "+ JSON.stringify(userList))
      });

    };

    reader.readAsBinaryString(file);
  }
  render() {
    const wellStyles = {
      maxWidth: 400,
      margin: '0 auto 10px'
    };
    const fontSize = 5;
    return ( <
      div align = "center"
      oncontextmenu = "return false" >
      <
      br / > < br / > < br / >
      <
      div className = "dropzone" >
      <
      Dropzone accept = ".csv"
      onDropAccepted = {
        this.onDrop.bind(this)
      } >
      <
      /Dropzone> <
      br / > < br / > < br / >
      <
      /div> <
      h2 > Upload or drop your < font size = {
        fontSize
      }
      color = "#00A4FF" > CSV < /font><br / > file here. < /h2> <
      /div>
    )
  }
}

export default FeesImport;