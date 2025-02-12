package jamn.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.firebase.client.AuthData;
import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ValueEventListener;

import jamn.R;
import jamn.activities.MainActivity;

public class MainLoginFragment extends Fragment {
    private Button mLoginButton;
    private Button  mCreateButton;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        final View v = inflater.inflate(R.layout.fragment_main_login, container, false);
        final Firebase rootRef = new Firebase("https://remote-hound.firebaseio.com/");

        mLoginButton = (Button) v.findViewById(R.id.login_button);
        mLoginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View buttonView) {
                final String email = ((EditText)v.findViewById(R.id.username)).getText().toString();
                final String pw =  ((EditText)v.findViewById(R.id.password)).getText().toString();
                Log.d("MainLoginFrag", "Clicked login!");

                // Attempt to authenticate the user
                rootRef.authWithPassword(email, pw, new Firebase.AuthResultHandler() {
                    @Override
                    public void onAuthenticated(AuthData authData) {
                        Toast.makeText(getContext(), "Successful Login!", Toast.LENGTH_SHORT).show();

                        // Start main activity
                        Intent i = new Intent(getActivity(), MainActivity.class);
                        startActivity(i);
                        getActivity().finish();
                    }

                    @Override
                    public void onAuthenticationError(FirebaseError firebaseError) {
                        // Else, show error toast
                        Toast.makeText(getContext(), "You fucked up!", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        mCreateButton = (Button) v.findViewById(R.id.create_button);
        mCreateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // show create account fragment
                CreateAccountFragment createAccount = new CreateAccountFragment();
                FragmentTransaction transaction = getFragmentManager().beginTransaction();
                transaction.replace(R.id.fragment_container, createAccount)
                        .addToBackStack(null)
                        .commit();
            }
        });

        return v;
    }

}
