<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\RssUrl;

use Illuminate\Http\JsonResponse;
use Feeds;
use Carbon\Carbon;

class RssFeedController extends ApiController
{
    /**
     * @var RssUrl
     */
    private $rssUrl;

    /**
     * RssFeedController constructor.
     *
     * @param RssUrl $rssUrl
     */
    public function __construct(RssUrl $rssUrl)
    {
        $this->rssUrl = $rssUrl;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function makeFeeds(Request $request): JsonResponse
    {
        $urls = $this->rssUrl->get();
        $rssUrls = [];
        foreach ($urls as $key => $url) {
            $rssUrls[] = $url['url'];
        }
        if (count($rssUrls) == 0) {
            return $this->respond([]); 
        }
        $feed = Feeds::make($rssUrls);
        $data = array(
            'title'     => $feed->get_title(),
            'permalink' => $feed->get_permalink(),
            'items'     => $feed->get_items()
        );
        $items = $data['items'];

        $retItems = array();
        foreach ($items as $key => $item) {
            if (in_array($item->get_title(), array_column($retItems, 'title'))) {
                continue;
            }
            if (count($retItems) > 6) continue;
            $retItem = [
                'link' => $item->get_permalink(),
                'title' => $item->get_title(),
                'author' => $item->get_author(),
                'pub_date' => Carbon::parse($item->get_date())->diffForHumans(),
                'description' => $item->get_description()
            ];
            $retItems[] = $retItem;
        }        
        return $this->respond($retItems);
    }
}
