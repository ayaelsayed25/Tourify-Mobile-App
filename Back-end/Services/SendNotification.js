const { Expo } = require('expo-server-sdk');
// const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
const expo = new Expo();

exports.sendNotification = (pushTokens, message) => {
    console.log("lollipop")
    console.log({ pushTokens })
    console.log({ message })
    let messages = [];
    for (let pushToken of pushTokens) {

        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        messages.push(message)
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {

        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);

            } catch (error) {
                return reject(error)
            }
        }
    })();


    let receiptIds = [];
    for (let ticket of tickets) {

        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    // (async () => {
    //     // Like sending notifications, there are different strategies you could use
    //     // to retrieve batches of receipts from the Expo service.
    //     for (let chunk of receiptIdChunks) {
    //         try {
    //             let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
    //             console.log(receipts);

    //             // The receipts specify whether Apple or Google successfully received the
    //             // notification and information about an error, if one occurred.
    //             for (let receiptId in receipts) {
    //                 let { status, message, details } = receipts[receiptId];
    //                 if (status === 'ok') {
    //                     continue;
    //                 } else if (status === 'error') {
    //                     console.error(
    //                         `There was an error sending a notification: ${message}`
    //                     );
    //                     if (details && details.error) {

    //                         console.error(`The error code is ${details.error}`);
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             return reject(error)
    //         }
    //     }
    // })();

}


