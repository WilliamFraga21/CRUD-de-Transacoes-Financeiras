<?php

namespace App\Http\Controllers;

use App\Actions\ExampleAction;
use App\Http\Requests\ExampleRequest;
use App\Models\User;
use App\Repositories\ExampleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserAuthController
{




    public function register(Request $request){
        $registerUserData = $request->validate([
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|min:8'
        ]);
        $user = User::create([
            'name' => $registerUserData['name'],
            'email' => $registerUserData['email'],
            'password' => Hash::make($registerUserData['password']),
        ]);
        return response()->json([
            'message' => 'User Created ',
        ]);
    }
}
