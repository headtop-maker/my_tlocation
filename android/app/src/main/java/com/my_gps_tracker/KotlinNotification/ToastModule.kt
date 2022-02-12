package com.my_gps_tracker

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


import android.content.Intent
import android.app.Activity
import android.app.ActivityManager
import android.content.Context
import android.os.Build
import android.provider.Settings
import android.util.Log
import com.facebook.react.bridge.Callback
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import java.util.*
import com.facebook.react.bridge.WritableNativeMap

import com.facebook.react.bridge.WritableMap



class ToastModules(reactContext:ReactApplicationContext):ReactContextBaseJavaModule(reactContext){
    var activity: Activity? = null
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var database: DatabaseReference
    private val DURATION_SHORT_KEY = "SHORT"
    private val DURATION_LONG_KEY = "LONG"

    override fun getName(): String {
        return "ToastKotlin"
    }

    override fun getConstants(): kotlin.collections.Map<String, Any> {
        val constants = HashMap<String,Any>()
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT)
        constants.put(DURATION_LONG_KEY,Toast.LENGTH_LONG)

        return constants
    }

    fun initializeDbRef() {
        // [START initialize_database_ref]
        database = Firebase.database.reference
        // [END initialize_database_ref]
    }

    @ReactMethod
    fun show(message:String,duration: Int){
        Toast.makeText(reactApplicationContext,message,duration).show()
    }

    @ReactMethod
    fun getFromDataBaseOnce(remoteDevId:String,successCallback: Callback){
        val resultData: WritableMap = WritableNativeMap()

        initializeDbRef()

        database.child(remoteDevId).get().addOnSuccessListener {
            val latitude = it.child("latitude").value
            val longitude= it.child("longitude").value

            val batteryDev = it.child("battery").value
            val dateDev = it.child("date").value

            resultData.putString("latitude", "$latitude")
            resultData.putString("longitude", "$longitude")

            resultData.putString("battery", "$batteryDev")
            resultData.putString("date", "$dateDev")

            successCallback.invoke(resultData)
        }.addOnFailureListener{
            Log.e("firebase", "Error getting data", it)
            Toast.makeText(reactApplicationContext,"Ошибка получения",Toast.LENGTH_SHORT).show()
        }

    }


    @ReactMethod
    fun getDeviceID(successCallback: Callback) {
        var devId = Settings.Secure.getString(currentActivity?.contentResolver,
            Settings.Secure.ANDROID_ID
        )
        successCallback.invoke(devId)
    }

    @ReactMethod
    fun startForeGroundService(deviceID:String,deviceLatitude:Double,deviceLongitude:Double,devAccuracy:Int){
        val intent = Intent(getReactApplicationContext(), MyForegroundService::class.java)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            intent.action = "START"
            intent.putExtra("devId",deviceID)
            intent.putExtra("deviceLatitude",deviceLatitude)
            intent.putExtra("deviceLongitude",deviceLongitude)
            intent.putExtra("deviceAccuracy",devAccuracy)
            getReactApplicationContext()?.startForegroundService(intent)
        };
    }


    @ReactMethod
    fun stopForeGroundService(){
        val intent = Intent(getReactApplicationContext(), MyForegroundService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            intent.action = "STOP"
            getReactApplicationContext()?.stopService(intent)
        };
    }


    @ReactMethod
    fun startServiceLocation(deviceID: String) {
        val intent = Intent(currentActivity, MyLocation::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            intent.putExtra("devId",deviceID)
            reactApplicationContext?.startForegroundService(intent)
        };

    }

    @ReactMethod
    fun stopServiceLocation(){
        val intent = Intent(getReactApplicationContext(), MyLocation::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getReactApplicationContext()?.stopService(intent)
        };
    }

    @ReactMethod
    private fun isServiceRunning(serviceName:String, successCallback: Callback): Boolean {
        val manager = reactApplicationContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager?
        for (service in manager!!.getRunningServices(Int.MAX_VALUE)) {
            if ("com.my_gps_tracker.${serviceName}" == service.service.className) {
                Toast.makeText(reactApplicationContext,"service running",Toast.LENGTH_SHORT).show()
                successCallback(true)
                return true
            }
        }
       Toast.makeText(reactApplicationContext,"service stopping",Toast.LENGTH_SHORT).show()
        successCallback(false)
        return false
    }

}

