<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Disease;
use App\Models\DPOrigin;
use App\Models\TherapyArea;
use App\Models\Atc3;
use App\Models\Atc2;
use App\Models\Atc1;
use App\Models\MarketData;
use App\Models\DrugForm;

use Illuminate\Http\JsonResponse;
use DB;
class DashboardController extends ApiController
{
    /**
     * @var Disease
     */
    private $disease;
    
    /**
     * @var DPOrigin
     */
    private $diseasePrevalence;

    /**
     * @var TherapyArea
     */
    private $therapyArea;

    /**
     * @var Atc3
     */
    private $atc3;

    /**
     * @var Atc2
     */
    private $atc2;

    /**
     * @var Atc1
     */
    private $atc1;

    /**
     * @var MarketData
     */
    private $marketData;

    /**
     * @var DrugForm
     */
    private $drug_form;

    /**
     * DashboardController constructor.
     *
     * @param Disease $disease
     * @param DPOrigin $diseasePrevalence
     * @param TherapyArea $therapyArea
     * @param Atc3 $atc3
     * @param Atc2 $atc2
     * @param MarketData $marketData
     */
    public function __construct(Disease $disease, DPOrigin $diseasePrevalence, TherapyArea $therapyArea, Atc3 $atc3, Atc2 $atc2, Atc1 $atc1, MarketData $marketData, DrugForm $drug_form)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->therapyArea = $therapyArea;
        $this->atc3 = $atc3;
        $this->atc2 = $atc2;
        $this->atc1 = $atc1;
        $this->marketData = $marketData;
        $this->drug_form = $drug_form;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // $diseasePrevalenceCount = $this->diseasePrevalence->distinct('patient')->count('patient');
        $marketDataCount = $this->marketData->count();

        // $initialDatas = $this->diseasePrevalence
        //     ->select('disease_id', 'therapy_area_id', 'atc2_id', 'atc3_id', 'patient')
        //     ->get();
        // $datas = $initialDatas
        //     ->groupBy('disease_id')
        //     ->map(function($item, $key) {
        //         return collect($item)->groupBy('patient')->count();
        //     })
        //     ->toArray();
        // arsort($datas);
        // $datas = array_slice($datas, 0, 5, TRUE);
        // $diseaseChart = [];
        // foreach ($datas as $key => $data) {
        //     $disease = $this->disease->where('id', $key)->first()['name'];
        //     $diseaseChart[$disease] = round($data / $diseasePrevalenceCount * 100, 2);
        // }

        // $datas = $initialDatas
        //     ->groupBy(['therapy_area_id'])
        //     ->map(function($item, $key) {
        //         return collect($item)->groupBy('patient')->count();
        //     })
        //     ->toArray();
        // arsort($datas);
        // $datas = array_slice($datas, 0, 5, TRUE);
        // $datas = array_slice($datas, 0, 5, TRUE);
        // $diseaseCategoriesChart = [];
        // foreach ($datas as $key => $data) {
        //     $therapyArea = $this->therapyArea->where('id', $key)->first()['name'];
        //     $diseaseCategoriesChart[$therapyArea] = round($data / $diseasePrevalenceCount * 100, 2);
        // }

        // $datas = $initialDatas
        //     ->groupBy(['atc2_id'])
        //     ->map(function($item, $key) {
        //         return collect($item)->groupBy('patient')->count();
        //     })
        //     ->toArray();
        // arsort($datas);
        // $datas = array_slice($datas, 0, 5, TRUE);
        // $treatmentMappingAtc2 = [];
        // foreach ($datas as $key => $data) {
        //     $atc2 = $this->atc2->where('id', $key)->first()['name'];
        //     $treatmentMappingAtc2[$atc2] = round($data / $diseasePrevalenceCount * 100, 2);
        // }

        // $datas = $initialDatas
        //     ->groupBy(['atc3_id'])
        //     ->map(function($item, $key) {
        //         return collect($item)->groupBy('patient')->count();
        //     })
        //     ->toArray();
        // arsort($datas);
        // $datas = array_slice($datas, 0, 5, TRUE);
        // $treatmentMappingAtc3 = [];
        // foreach ($datas as $key => $data) {
        //     $atc3 = $this->atc3->where('id', $key)->first()['name'];
        //     $treatmentMappingAtc3[$atc3] = round($data / $diseasePrevalenceCount * 100, 2);
        // }

        $datas = $this->marketData
            ->groupBy('drug_form_id')
            ->selectRaw('count(drug_form_id) as total, drug_form_id')
            ->pluck('total', 'drug_form_id')
            ->toArray();
        $marketSharebySegment = [];
        foreach ($datas as $key => $data) {
            $drug_form = $this->drug_form->where('id', $key)->first()['name'];
            $marketSharebySegment[$drug_form] = round($data / $marketDataCount * 100, 2);
        }

        $datas = $this->marketData
            ->groupBy('drug_form_id')
            ->selectRaw('sum(value) as total_price, drug_form_id')
            ->pluck('total_price', 'drug_form_id')
            ->toArray();
        $totalMarketShare = [];
        foreach ($datas as $key => $data) {
            $drug_form = $this->drug_form->where('id', $key)->first()['name'];
            $totalMarketShare[$drug_form] = $data;
        }

        $datas = $this->marketData
            ->select('atc1_id', DB::raw("count(atc1_id) as total"))
            ->groupBy(['atc1_id'])
            ->pluck('total','atc1_id')
            ->toArray();
        arsort($datas);
        $datas = array_slice($datas, 0, 6, TRUE);        
        $totalMarketAnaAtc1 = [];
        foreach ($datas as $key => $data) {
            $atc1 = $this->atc1->where('id', $key)->first()['name'];
            $totalMarketAnaAtc1[$atc1] = round($data / $marketDataCount * 100, 2);
        }

        $datas = $this->marketData            
            ->select('atc2_id', DB::raw("count(atc2_id) as total"))
            ->groupBy(['atc2_id'])
            ->pluck('total','atc2_id')
            ->toArray();        
        arsort($datas);
        $datas = array_slice($datas, 0, 6, TRUE);
        $totalMarketAnaAtc2 = [];
        foreach ($datas as $key => $data) {
            $atc2 = $this->atc2->where('id', $key)->first()['name'];
            $totalMarketAnaAtc2[$atc2] = round($data / $marketDataCount * 100, 2);
        }

        return $this->respond([
            // 'diseaseChart' => $diseaseChart,
            'diseaseChart' => [
                "Pain"=> 64.7,
                "Malaria"=> 42.93,
                "Vitamin Deficiency"=> 35.69,
                "Respiratory Disorder"=> 13.31,
                "Tonsilitis"=> 11.35
            ],
            // 'diseaseCategoriesChart' => $diseaseCategoriesChart,
            'diseaseCategoriesChart' => [
                "Infectious Diseases"=> 71.63,
                "Musculoskeletal"=> 64.62,
                "Vitamin and Mineral Deficiency"=> 38.83,
                "Respiratory"=> 20.37,
                "Gastroenterology & Hepatology"=> 9.66
            ],
            // 'treatmentMappingAtc2' => $treatmentMappingAtc2,
            'treatmentMappingAtc2' => [
                "J01 Antibacterials for systemic use"=> 50.91,
                "N02 Analgesics"=> 49.89,
                "P01 Antiprotozoals"=> 42.19,
                "A11 Vitamins"=> 36.16,
                "M01 Anti-inflammatory and antirheumatic products"=> 23.81
            ],
            // 'treatmentMappingAtc3' => $treatmentMappingAtc3,
            'treatmentMappingAtc3' => [
                "N02B Other analgesics and antipyretics"=> 47.77,
                "P01B Antimalarials"=> 42.13,
                "J01C Beta-lactam antibacterials, penicillins"=> 24.69,
                "M01A Anti-inflammatory and antirheumatic products, non-steroids"=> 23.81,
                "R06A Antihistamines for systemic use"=> 21.75
            ],
            'marketSharebySegment' => $marketSharebySegment,
            'totalMarketShare' =>$totalMarketShare,
            'totalMarketAnaAtc1' =>$totalMarketAnaAtc1,
            'totalMarketAnaAtc2' =>$totalMarketAnaAtc2
        ]);
    }
}
