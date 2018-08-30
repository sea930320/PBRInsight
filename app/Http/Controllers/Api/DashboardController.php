<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Disease;
use App\Models\DiseasePrevalence;
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
     * @var DiseasePrevalence
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
     * @param DiseasePrevalence $diseasePrevalence
     * @param TherapyArea $therapyArea
     * @param Atc3 $atc3
     * @param Atc2 $atc2
     * @param MarketData $marketData
     */
    public function __construct(Disease $disease, DiseasePrevalence $diseasePrevalence, TherapyArea $therapyArea, Atc3 $atc3, Atc2 $atc2, Atc1 $atc1, MarketData $marketData, DrugForm $drug_form)
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
        $diseasePrevalenceCount = $this->diseasePrevalence->count();
        $marketDataCount = $this->marketData->count();

        $datas = $this->diseasePrevalence            
            ->select('disease_id', DB::raw("count(disease_id) as total"))
            ->groupBy(['disease_id'])
            ->pluck('total','disease_id')
            ->toArray();
        arsort($datas);
        $datas = array_slice($datas, 0, 5, TRUE);
        $diseaseChart = [];
        foreach ($datas as $key => $data) {
            $disease = $this->disease->where('id', $key)->first()['name'];
            $diseaseChart[$disease] = round($data / $diseasePrevalenceCount * 100, 2);
        }

        $datas = $this->diseasePrevalence            
            ->select('therapy_area_id', DB::raw("count(therapy_area_id) as total"))
            ->groupBy(['therapy_area_id'])
            ->pluck('total','therapy_area_id')
            ->toArray();        
        arsort($datas);
        $datas = array_slice($datas, 0, 5, TRUE);
        $datas = array_slice($datas, 0, 5, TRUE);
        $diseaseCategoriesChart = [];
        foreach ($datas as $key => $data) {
            $therapyArea = $this->therapyArea->where('id', $key)->first()['name'];
            $diseaseCategoriesChart[$therapyArea] = round($data / $diseasePrevalenceCount * 100, 2);
        }

        $datas = $this->diseasePrevalence            
            ->select('atc2_id', DB::raw("count(atc2_id) as total"))
            ->groupBy(['atc2_id'])
            ->pluck('total','atc2_id')
            ->toArray();
        arsort($datas);
        $datas = array_slice($datas, 0, 5, TRUE);
        $treatmentMappingAtc2 = [];
        foreach ($datas as $key => $data) {
            $atc2 = $this->atc2->where('id', $key)->first()['name'];
            $treatmentMappingAtc2[$atc2] = round($data / $diseasePrevalenceCount * 100, 2);
        }

        $datas = $this->diseasePrevalence            
            ->select('atc3_id', DB::raw("count(atc3_id) as total"))
            ->groupBy(['atc3_id'])
            ->pluck('total','atc3_id')
            ->toArray();        
        arsort($datas);
        $datas = array_slice($datas, 0, 5, TRUE);
        $treatmentMappingAtc3 = [];
        foreach ($datas as $key => $data) {
            $atc3 = $this->atc3->where('id', $key)->first()['name'];
            $treatmentMappingAtc3[$atc3] = round($data / $diseasePrevalenceCount * 100, 2);
        }

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
            'diseaseChart' => $diseaseChart,
            'diseaseCategoriesChart' => $diseaseCategoriesChart,
            'treatmentMappingAtc2' => $treatmentMappingAtc2,
            'treatmentMappingAtc3' => $treatmentMappingAtc3,
            'marketSharebySegment' => $marketSharebySegment,
            'totalMarketShare' =>$totalMarketShare,
            'totalMarketAnaAtc1' =>$totalMarketAnaAtc1,
            'totalMarketAnaAtc2' =>$totalMarketAnaAtc2
        ]);
    }
}
