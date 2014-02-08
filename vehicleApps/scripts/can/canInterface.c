#include <canlib.h>
#include <stdio.h>
#include <signal.h>
#include <errno.h>
#include <unistd.h>
#include <string.h>
#include <stddef.h>
#include <stdio.h>

#define HS_CHANNEL 0
#define HS_BAUD 500000
#define HS_TSEG1 4
#define HS_TSEG2 3
#define HS_SJW 1
#define HS_SAMPLE_POINTS 1
#define HS_SYNC_MODE 0
#define HS_FLAGS 0

#define LS_CHANNEL 1
#define LS_BAUD 33333
#define LS_TSEG1 12
#define LS_TSEG2 3
#define LS_SJW 3
#define LS_SAMPLE_POINTS 1
#define LS_SYNC_MODE 0
#define LS_FLAGS 0

// Static can bus handles
canHandle hsHandle;
canHandle lsHandle;

typedef struct {
    int channel;
    long id;
    int length;
    char* data;
} Message;

/*
 * Prints the given message to stdout
 */
void printMessage(Message* message) {
    printf("channel-> %d\n", message->channel);
    printf("id-> %ld\n", message->id);
    printf("length-> %d\n", message->length);

    int i;
    printf("data->");
    for (i = 0; i < message->length; i++) {
        printf(" %02X", message->data[i] & 0xFF);
    }
    printf("\n");
}

/*
 * Mallocs a new Message initialized with the given values. The data is copied to a new data array.
 * Returns the newly created Message
 */
Message* newMessage(int channel, long id, int length, unsigned char* data) {
    Message *m = malloc(sizeof(Message));
    m->channel = channel;
    m->id = id;
    m->length = length;
    m->data = malloc(sizeof(char) * length);

    // Copy data over to new array
    int i;
    for (i = 0; i < length; i++) {
        m->data[i] = data[i];
    }

    printf("Created Message: \n");
    printMessage(m);
    printf("\n");

    return m;
}

/*
 * Frees the given Message and its data array
 */
void freeMessage(Message* message) {
    free(message->data);
    free(message);
}

int initialize() {

    // NOTE: Is this actually needed?
    siginterrupt(SIGINT, 1);

    // intialize hsHandle with correct bus params etc
    hsHandle = canOpenChannel(HS_CHANNEL, HS_FLAGS);
    if (hsHandle < 0) {
      printf("canOpenChannel HS_CHANNEL failed: %d\n", hsHandle);
      return 0;
    }
    // NOTE: Why is this canBusOff here?
    canBusOff(hsHandle);
    canSetBusParams(hsHandle, HS_BAUD, HS_TSEG1, HS_TSEG2, HS_SJW, HS_SAMPLE_POINTS, HS_SYNC_MODE);

    // intialize lsHandle with correct bus params etc.
    lsHandle = canOpenChannel(LS_CHANNEL, LS_FLAGS);
    if (lsHandle < 0) {
      printf("canOpenChannel LS_CHANNEL failed: %d\n", lsHandle);
      return 0;
    }
    // NOTE: Why is this canBusOff here?
    canBusOff(lsHandle);
    canSetBusParams(lsHandle, LS_BAUD, LS_TSEG1, LS_TSEG2, LS_SJW, LS_SAMPLE_POINTS, LS_SYNC_MODE);

    return 1;
}

void readMessage(Message* message) {
    if (message->channel == 0) {
        // high speed
        canBusOn(hsHandle);
        canRead(hsHandle, &message->id, &message->length, NULL, NULL, NULL);
        canBusOff(hsHandle);
    } else {
        // low speed
        canBusOn(lsHandle);
        canRead(lsHandle, &message->id, &message->length, NULL, NULL, NULL);
        canBusOff(lsHandle);
    }

    // using message->channel choose hsHandle or lsHandle
    // using message->id, message->length, and message->data, read message
}

void writeMessage(Message* message) {
    /* unsigned char msg[8];
    msg[0] = 0x07;
    msg[1] = 0xAE;
    msg[2] = 0x02;
    msg[3] = 0x08;
    msg[4] = 0x00;
    msg[5] = 0x00;
    msg[6] = 0x00;
    msg[7] = 0x00; */

    printf("Writing Message: \n");
    printMessage(message);
    printf("\n");

    if (message->channel == 0) { // high speed
        canBusOn(hsHandle);
        canWrite(hsHandle, message->id, message->data, message->length, canMSG_STD);
        // NOTE: Should there be a canBusOff() here?
    } else { // low speed
        canBusOn(lsHandle);
        canWrite(lsHandle, message->id, message->data, message->length, canMSG_STD);
        // NOTE: Should there be a canBusOff() here?
    }
}

int main() {
    return 0;
}
