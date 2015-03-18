package com.example.beatr_000.pushnotificationsexperience;

import android.app.Application;
import android.util.Log;

import com.parse.Parse;
import com.parse.ParseException;
import com.parse.ParsePush;
import com.parse.SaveCallback;

/**
 * Created by beatr_000 on 15/03/2015.
 */
public class ParsePushApp extends Application{
    @Override
    public void onCreate(){
        Parse.initialize(this, "HB9xMnZiME6rano68rwVfAlFf9oc8kFzswOGSxoY", "37Zn4FghOBUtOt1Baiz9RUb5Pq474rbklmXErWuz");
        
        ParsePush.subscribeInBackground("", new SaveCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    Log.d("com.parse.push", "successfully subscribed to the broadcast channel.");
                } else {
                    Log.e("com.parse.push", "failed to subscribe for push", e);
                }
            }
        });
    }

}
