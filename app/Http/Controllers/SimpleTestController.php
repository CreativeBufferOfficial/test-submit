<?php

namespace App\Http\Controllers;

use App\Mail\SendSubmittedData;
use Illuminate\Http\Request;
use App\Models\Test;
use Illuminate\Support\Facades\Mail;
use Validator;

class SimpleTestController extends Controller
{
    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        return view('test');
    }
    
    /**
     * @return void
     */
    public function store(Request $request)
    {
        // Handle the valodation here
        $validator = Validator::make($request->all(), [
            'messages'=> ["required","array","min:1"],
            'messages.*.color' => 'required',
            'messages.*.name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $response = Test::store($request->messages);
        
        if($response->status()===201)
            \Mail::to(env('EMAIL_TO'))->send(new \App\Mail\SendSubmittedData($request->messages));

        return $response;
    }
}
