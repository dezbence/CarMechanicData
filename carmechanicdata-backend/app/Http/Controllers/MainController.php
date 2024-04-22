<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Part;
use App\Models\Repair;
use App\Models\User;


use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Mail;

//use App\Mail\PasswordForgot;

use Laravel\Sanctum\PersonalAccessToken;

class MainController extends BaseController
{
    public function getUserData() {
        return  $this->sendResponse(Auth::user(), 'Sikeres művelet!');
    }

    function searchCars(Request $request) {

        $cars = Car::where("user_id", '=', Auth::user()->id)
            ->where("brand", "like", "%".$request->all()['brand']."%")
            ->where('type', 'like', '%'.$request->all()['type'].'%')
            ->where('owner', 'like', '%'.$request->all()['owner'].'%')
            ->where('license_number', 'like', '%'.$request->all()['license_number'].'%')
            ->get();

        return  $this->sendResponse($cars, 'Sikeres művelet!');
    }

    function deleteCar($id) {
        Car::find($id)
            ->delete();
        return  $this->sendResponse('', 'Sikeres művelet!');
    }

    function editCar(Request $request) {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'brand' => 'required',
            'type' => 'required',
            'owner' => 'nullable',
            'license_number' => 'nullable'
        ]);

        if ($validator->fails()) return $this->sendError('Bad request', $validator->errors(), 400);

        $car = Car::where('id', '=', $request->id)
            ->where("user_id", '=', Auth::user()->id)
            ->get();

        if (count($car) == 0) return $this->sendError('Not Found', 'Nincs ilyen autó!', 404);

        $car[0]->update($request->all());

        return  $this->sendResponse($car, 'Sikeres művelet!');
    }

    function getRepairs($car_id, $date = null) {

        $cars = Car::with([
            'repairs' => function ($query) use($car_id, $date) {
                $query->where('car_id', '=', $car_id)
                    ->where('date', 'like', '%'.$date.'%');
            }
            ])
                ->where('user_id', '=', Auth::user()->id)
                ->get();

        if (count($cars) == 0) $this->sendError('Not Found', 'Nincs ilyen szerelés!', 404);

        return  $this->sendResponse($cars[0]->repairs, 'Sikeres művelet!');
    }

    function editRepair(Request $request) {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'date' => 'required',
            'wage' => 'nullable',
            'tip' => 'nullable',
            'afa' => 'nullable',
            'description' => 'nullable'
        ]);

        if ($validator->fails()) return $this->sendError('Bad request', $validator->errors(), 400);

        $repairs = Repair::find($request->id);

        if (count($repairs) == 0) return $this->sendError('Not Found', 'Nincs ilyen autó!', 404);

        $repairs[0]->update($request->all());

        return  $this->sendResponse($repairs, 'Sikeres művelet!');
    }

    function deleteRepair($id) {
        Repair::find($id)
            ->delete();
        return  $this->sendResponse('', 'Sikeres művelet!');
    }

    function getParts($car_id, $repair_id) {

        $cars = Car::with([
            'repairs' => function ($query) use($car_id) {
                $query->where("car_id", '=', $car_id);
            },
            'repairs.parts' => function ($query) use($repair_id) {
                $query->where("repair_id", '=', $repair_id);
            }
            ])
                ->where('user_id', '=', Auth::user()->id)
                ->get();

        if (count($cars) == 0) return $this->sendError('Not Found', 'Nincs ilyen alkatrész!', 404);

        return $this->sendResponse($cars[0]->repairs[0]->parts, 'Sikeres művelet!');
    }

    function editPart()  {

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'name' => 'required',
            'article_number' => 'nullable',
            'buying_price' => 'nullable',
            'selling_price' => 'nullable'
        ]);

        if ($validator->fails()) return $this->sendError('Bad request', $validator->errors(), 400);

        $parts = Repair::find($request->id);

        if (count($parts) == 0) return $this->sendError('Not Found', 'Nincs ilyen autó!', 404);

        $parts[0]->update($request->all());

        return  $this->sendResponse($parts, 'Sikeres művelet!');
    }

    function deletePart($id) {
        Part::find($id)
            ->delete();
        return  $this->sendResponse('', 'Sikeres művelet!');
    }




}
