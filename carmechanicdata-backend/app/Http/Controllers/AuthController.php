<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class AuthController extends BaseController
{

    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:App\Models\User,email',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
            'role' => 'required'
        ], [
            'email.unique' => "Az email cím már használatban van!",
        ]);

         if ($validator->fails()){
            return $this->sendError('Bad request', $validator->errors(), 400);
         }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $user = User::create($input);

        return $this->sendResponse('','Sikeres regisztráció!');
    }


    public function login(Request $request){

        $validatorFields = [
            'email' => 'required',
            'password'=> 'required'
        ];

        $validator = Validator::make($request->all(),  [
            'email' => 'required',
            'password'=> 'required'
        ]);

        if ($validator->fails()){
           return $this->sendError('Bad request', $validator->errors(), 400);
        }

        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {

            $user = Auth::user();
            $success['token'] = $user->createToken('Secret')->plainTextToken;
            $success['name'] = $user->name;
            $success['role'] = $user->role;

            return $this->sendResponse($success,'Sikeres bejelentkezés!');
        } 
        
        return $this->sendError('Unauthorized','Sikertelen bejelentkezés!', 401);

    }

    public function logout(){
        Auth::user()->currentAccessToken()->delete();
        return $this->sendResponse('' ,'Sikeres kijelentkezés!');
    }

    public function logoutAllDevice(){
        Auth::user()->tokens()->delete();
        return $this->sendResponse('' ,'Sikeres kijelentkezés az összes eszközön!');
    }
}
