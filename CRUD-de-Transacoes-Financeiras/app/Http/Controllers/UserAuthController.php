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

    public function __construct(
        private readonly ExampleRepository $exampleRepository
    )
    {

    }

    public function delete(
        ExampleAction $exampleAction,
        ExampleRequest $exampleRequest



    ){

        try {

            $teste = $exampleAction->execute(
                $exampleRequest,
                $this->exampleRepository
            );


            $teste2 = $this->exampleRepository->store($teste);




            logger()->info('account created with id="' . $teste2 . '"');
            return response()->json(['success' => true, 'data' => $teste2]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }



    }



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
