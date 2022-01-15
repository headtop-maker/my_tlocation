package com.my_gps_tracker

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


import java.util.HashMap
import android.content.Intent
import android.app.Activity
import android.os.Build
import com.google.android.gms.location.FusedLocationProviderClient


class ToastModules(reactContext:ReactApplicationContext):ReactContextBaseJavaModule(reactContext){
    var activity: Activity? = null
    private lateinit var fusedLocationClient: FusedLocationProviderClient
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

    @ReactMethod
    fun show(message:String,duration: Int){
        Toast.makeText(reactApplicationContext,message,duration).show()
    }

    @ReactMethod
    fun startServiceLocation() {
        val intent = Intent(currentActivity, MyLocation::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
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

