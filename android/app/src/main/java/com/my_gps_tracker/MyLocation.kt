package com.my_gps_tracker

import android.Manifest
import android.app.*
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.BatteryManager
import android.os.Build
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.*
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.ceil

class MyLocation : Service() {

    private lateinit var database: DatabaseReference
    private lateinit var fusedLocationClient: FusedLocationProviderClient

    @RequiresApi(api = Build.VERSION_CODES.O)
    fun initializeDbRef() {
        // [START initialize_database_ref]
        database = Firebase.database.reference
        // [END initialize_database_ref]
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        initializeDbRef()
        val CHANNELID = "Foreground Service ID"
        val channel = NotificationChannel(CHANNELID, CHANNELID, NotificationManager.IMPORTANCE_LOW)
        getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        val notification =
                Notification.Builder(this, CHANNELID)
                        .setContentText("Service location is running")
                        .setContentTitle("Service location enable")
                        .setSmallIcon(R.drawable.android)

            getLastLocation(intent?.getStringExtra("devId").toString())
        startForeground(1002, notification.build())

        return super.onStartCommand(intent, flags, startId)
    }

    override fun onDestroy() {
        stopForeground(true)
        stopSelf(1002)
        stopSelf()
        super.onDestroy()
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    fun getLevel(): Double {
        val iFilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        val battery = this.registerReceiver(null, iFilter)
        val level = battery!!.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
        val scale = battery.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
        val batteryPercent =  level / scale.toFloat() // значение от 0 до 1
        return batteryPercent.toDouble()
    }

    fun getDate(): String {
        val sdf = SimpleDateFormat("dd/M/yyyy hh:mm:ss a")
        return sdf.format(Date())
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun getLastLocation(devId: String) {
        initializeDbRef()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) !=
                        PackageManager.PERMISSION_GRANTED &&
                        ActivityCompat.checkSelfPermission(
                                this,
                                Manifest.permission.ACCESS_COARSE_LOCATION
                        ) != PackageManager.PERMISSION_GRANTED
        ) {}
        val mLocationRequest = LocationRequest.create()
        mLocationRequest.interval = 3000
        mLocationRequest.fastestInterval = 2000
        mLocationRequest.priority = LocationRequest.PRIORITY_HIGH_ACCURACY

        val mLocationCallback: LocationCallback =
                object : LocationCallback() {
                    override fun onLocationResult(locationResult: LocationResult) {
                        for (location in locationResult.locations) {
                            if (location != null) {
                                Log.d("location", "${location.latitude},${location.longitude},${ceil(getLevel()*100)},${getDate()}")
                                database.child(devId)
                                        .child("latitude")
                                        .setValue(location.latitude)
                                database.child(devId)
                                        .child("longitude")
                                        .setValue(location.longitude)
                                database.child(devId)
                                    .child("battery")
                                    .setValue(ceil(getLevel()*100))
                                database.child(devId)
                                    .child("date")
                                    .setValue(getDate())

                            }
                        }
                    }
                }
        fusedLocationClient.requestLocationUpdates(
                mLocationRequest,
                mLocationCallback,
                Looper.myLooper()!!
        )
    }
}
