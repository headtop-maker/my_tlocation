package com.my_gps_tracker

import android.app.Notification
import android.os.Build
import android.content.Intent
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.graphics.Color

import android.os.IBinder
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

class MyForegroundService : Service() {
    var param:Boolean = true
    private lateinit var database: DatabaseReference
    lateinit var notificationManager: NotificationManager
    lateinit var notificationChannel: NotificationChannel
    lateinit var builder: Notification.Builder
    val channelId: String = "show_info"

    @RequiresApi(api = Build.VERSION_CODES.O)

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        initializeDbRef()

        val CHANNELID = "Foreground Service ID"
        val channel = NotificationChannel(
            CHANNELID,
            CHANNELID,
            NotificationManager.IMPORTANCE_LOW
        )
        getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        val notification = Notification.Builder(this, CHANNELID)
            .setContentText("Service is running")
            .setContentTitle("Service enable")
            .setSmallIcon(R.drawable.android)

        val action = intent.action
        if (action == "START"){
            Log.d("Faction",action)
        }

        Thread {
            while (param) {
                Log.d("FService", "Service Foreground run__ ${intent.getStringExtra("devId")}")
                onFirebaseData(intent.getStringExtra("devId").toString(),
                 intent.getStringExtra("deviceLatitude").toString(),
                    intent.getStringExtra("deviceLongitude").toString(),
                        intent.getIntExtra("deviceAccuracy",5),
                )
                    try {
                        Thread.sleep(2000)
                    } catch (e: InterruptedException) {
                        e.printStackTrace()
                    }
            }
        }.start()

       startForeground(1001, notification.build())


        return super.onStartCommand(intent, flags, startId)
    }

    override fun onDestroy() {
        Log.d("Faction","stopService")
        stopForeground(true)
        param= false
        super.onDestroy()
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    fun initializeDbRef() {
        // [START initialize_database_ref]
        database = Firebase.database.reference
        // [END initialize_database_ref]
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun onFirebaseData (devId:String, devLatitude: String, devLongitude: String, devAccuracy: Int){
        initializeDbRef()
        database.child(devId).get().addOnSuccessListener {
            if (it.exists()){
                var latitude = it.child("latitude").value.toString()
                var longitude= it.child("longitude").value.toString()
                var shortDevLatitude = ("%.${devAccuracy}f".format(devLatitude.toFloat()));
                var shortDevLongitude = ("%.${devAccuracy}f".format(devLongitude.toFloat()));
                var shortLatitude = ("%.${devAccuracy}f".format(latitude.toFloat()));
                var shortLongitude = ("%.${devAccuracy}f".format(longitude.toFloat()));

                Log.i("firebase", "Got value $latitude , $longitude,$shortDevLatitude,$shortDevLongitude ")

                if(latitude != devLatitude ||longitude != devLongitude){
                    showCurrentInfo("Позиция изменилась","текущее положение $latitude , $longitude")
                }

            }
        }.addOnFailureListener{
            Log.e("firebase", "Error getting data", it)
        }
    }

   @RequiresApi(Build.VERSION_CODES.O)
   fun showCurrentInfo(header: String, text: String) {
       if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
           val notificationChannel =
               NotificationChannel(
                   channelId,
                   "My notifications",
                   NotificationManager.IMPORTANCE_HIGH
               )
           notificationChannel.enableLights(true)
           notificationChannel.setDescription("Channel description")
           notificationChannel.setLightColor(Color.RED)
           notificationChannel.enableVibration(true)

           notificationManager = this.getSystemService(NotificationManager::class.java)
           notificationManager.createNotificationChannel(notificationChannel)


               val notificationBuilder: NotificationCompat.Builder =
                   NotificationCompat.Builder(this, channelId)

               notificationBuilder
                   .setAutoCancel(true)
                   .setWhen(System.currentTimeMillis())
                   .setTicker("hearty 356")
                   .setContentTitle(header)
                   .setContentText(text)
                   .setContentInfo("info")
                   .setSmallIcon(R.drawable.android)

               notificationManager.notify(4567, notificationBuilder.build())

       } else {
           TODO("VERSION.SDK_INT < O")
       }
   }




}