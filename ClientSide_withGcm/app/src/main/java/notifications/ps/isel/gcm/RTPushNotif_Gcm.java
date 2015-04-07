/**
 * Created by Oksana on 06/02/2015.
 * Copyright 2013 Google Inc.
 */

package notifications.ps.isel.gcm;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.gcm.GoogleCloudMessaging;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;

public class RTPushNotif_Gcm {

    private static final int PLAY_SERVICES_RESOLUTION_REQUEST = 9000;
    /**
     * This is the project number you got from the API Console, as described in "Getting Started."
     */
    String SENDER_ID = "909333422737";

    static final String TAG = "GCM Demo";

    Context context;
    String regId;


    public void initialize(Context c,Activity a) {
        context=c;

        if (checkPlayServices(a)) {

            RTPushNotif_GcmRegistrar rt = new RTPushNotif_GcmRegistrar(c);
            regId = rt.getRegistrationId();

            if (regId.isEmpty()) {
                rt.registerInBackground(SENDER_ID);
            }

        } else {
            Log.i(TAG, "No valid Google Play Services APK found.");

        }
    }

    /**
     * Check the device to make sure it has the Google Play Services APK.
     */
    public static boolean checkPlayServices(final Activity activity) {
        final int code = GooglePlayServicesUtil.isGooglePlayServicesAvailable(activity);
        if (code == ConnectionResult.SUCCESS) {
            return true;
        }
        if (GooglePlayServicesUtil.isUserRecoverableError(code)) {
            GooglePlayServicesUtil.getErrorDialog(code, activity, RTPushNotif_Gcm.PLAY_SERVICES_RESOLUTION_REQUEST).show();
        } else {
            activity.finish();
        }
        return false;
    }
}


