package com.databag;

import android.content.Context;
import org.jetbrains.annotations.NotNull;
import org.unifiedpush.android.connector.MessagingReceiver;
import android.util.Log;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;

import android.os.Build;
import android.net.Uri;
import android.media.RingtoneManager;
import androidx.core.app.NotificationCompat;

public class CustomReceiver extends MessagingReceiver {
    public CustomReceiver() {
        super();
    }
    @Override
    public void onNewEndpoint(@NotNull Context context, @NotNull String endpoint, @NotNull String instance) {

        Log.i("UNIFIED", "onNewEndpoint:instance=" + instance + " endpoint=" + endpoint);

        // Called when a new endpoint be used for sending push messages
    }

    @Override
    public void onRegistrationFailed(@NotNull Context context, @NotNull String instance) {
        // called when the registration is not possible, eg. no network
    }

    @Override
    public void onUnregistered(@NotNull Context context, @NotNull String instance) {
        // called when this application is unregistered from receiving push messages
    }

    @Override
    public void onMessage(@NotNull Context context, @NotNull byte[] message, @NotNull String instance) {

        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0 /* Request code */, intent,
                                                                PendingIntent.FLAG_IMMUTABLE);

        String channelId = "fcm_default_channel";
        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(context,
                                                                                        channelId)
        .setSmallIcon(R.mipmap.ic_launcher)
        .setContentTitle("FCM Message").setContentText("ROLO?").setAutoCancel(true).setSound(
                defaultSoundUri).setContentIntent(pendingIntent);

        NotificationManager notificationManager = (NotificationManager) context.getSystemService(
                Context.NOTIFICATION_SERVICE);

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(channelId, "Channel human readable title",
                                                                  NotificationManager.IMPORTANCE_DEFAULT);
            notificationManager.createNotificationChannel(channel);
    }

        notificationManager.notify(0, notificationBuilder.build());

        // Called when a new message is received. The message contains the full POST body of the push message
    }
}

