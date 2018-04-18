/**
 * 频道推荐位
 */

export async function recommendNavigartion(that) {
    const nav = await that.setQueryListMap([
        {sqlQuery: `SELECT news_recommend_subject, news_url FROM NEWS_WEB_RECOMMEND AS NEWS WHERE NEWS.RECOMMEND_CODE='web_sy_dhq_1' ORDER BY RANK ASC LIMIT 11`},
        {sqlQuery: `SELECT news_recommend_subject, news_url FROM NEWS_WEB_RECOMMEND AS NEWS WHERE NEWS.RECOMMEND_CODE='web_sy_dhq_2' ORDER BY RANK ASC LIMIT 11`},
        {sqlQuery: `SELECT news_recommend_subject, news_url FROM NEWS_WEB_RECOMMEND AS NEWS WHERE NEWS.RECOMMEND_CODE='web_sy_dhq_3' ORDER BY RANK ASC LIMIT 11`}
    ]);
    return nav;
};