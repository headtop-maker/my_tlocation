package com.my_gps_tracker

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


import android.content.Intent
import android.app.Activity
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
            var latitude = it.child("latitude").value
            var longitude= it.child("longitude").value
            resultData.putString("latitude", "$latitude")
            resultData.putString("longitude", "$longitude")
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
    fun startForeGroundService(deviceID:String,deviceLatitude:String,deviceLongitude:String){
        val intent = Intent(getReactApplicationContext(), MyForegroundService::class.java)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            intent.action = "START"
            intent.putExtra("devId",deviceID)
            intent.putExtra("deviceLatitude",deviceLatitude)
            intent.putExtra("deviceLongitude",deviceLongitude)
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


}

