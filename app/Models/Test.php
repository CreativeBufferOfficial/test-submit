<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;

class Test extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function store(array $data) {
        try {
            DB::beginTransaction();
            foreach($data as $key => $value)
                self::create($value);

            DB::commit();

            return response()->json(['message' => 'success'], 201);
        }
        catch(\Exception $e) {
            DB::rollback();
            \Log::error(["message" => $e->getMessage()]);
            return response()->json(['message' => $e->getMessage()], 500);
        }
        
    }
}
