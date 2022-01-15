package com.my_gps_tracker

import android.app.Notification
import android.app.NotificationChannel
import android.util.Log
import androidx.core.app.NotificationCompat
import android.app.NotificationManager
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import android.graphics.Color
import android.content.Context
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactMethod

class NotificationPop:ReactContextBaseJavaModule{
    var loadind:Boolean = false
    lateinit var notificationManager: NotificationManager
    lateinit var notificationChannel: NotificationChannel
    lateinit var builder: Notification.Builder
    val channelId: String = "bolt-id"
    lateinit var myContext: ReactApplicationContext

    constructor(context: ReactApplicationContext):super(context){
        this.loadind = true
        this.myContext = context

    }

    override fun getName(): String {
        return "Pop"
    }

    @ReactMethod
    fun trigger(){
         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationChannel = NotificationChannel(channelId,
                    "My notifications",NotificationManager.IMPORTANCE_HIGH)
           notificationChannel.enableLights(true);
            notificationChannel.setDescription("Channel escription")
            notificationChannel.setLightColor(Color.RED)
            notificationChannel.enableVibration(true);

            notificationManager = myContext.getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(notificationChannel)

             if(this.loadind){
                 val notificationBuilder :NotificationCompat.Builder = NotificationCompat.Builder(myContext,channelId)

                 notificationBuilder.setAutoCancel(true)
                         .setWhen(System.currentTimeMillis())
                         .setTicker("hearty 356")
                         .setContentTitle("Header")
                         .setContentText("decription")
                         .setContentInfo("info");
                 notificationManager.notify(1234,notificationBuilder.build());


             }
        } else {
            TODO("VERSION.SDK_INT < O")
        }

    }

}