var DATA_KEY, FACEBOOK_FEED_ELEMENTS_SELECTOR, SPOILER_WORDS_LIST, SPOILER_WORDS_REGEX;
DATA_KEY = "peace-without-politics";
FACEBOOK_FEED_ELEMENTS_SELECTOR = "#pagelet_trending_tags_and_topics ul > li, .userContentWrapper, #video_hub_featured_video_container, ._1b78, ._u3y";
SPOILER_WORDS_LIST = ["Diane Abbott", "Prime Minister", "Brexit", "Theresa May", "David Cameron", "Boris Johnson", "Nigel Farage", "Jeremy Corbyn",  "Black Lives Matter", "#RESIST", "Abortion", "abortion", "McConnell", "Confederacy", "confederacy", "Confederate", "confederate", "Electoral", "electoral", "Election", "election", "AntiFa", "antifa", "Secretary", "secretary", "Department of Homeland Security", "GOP", "Liberal", "liberal", "Trump", "Trümp", "Obama", "Hillary", "Clinton", "Bush", "Politics", "politics", "Political", "political", "President", "president", "Democrat", "Republican", "Democrats", "Republicans", "Pence", "White House", "Immigration", "immigration", "House of Representatives", "Constitution", "constitution", "Green Card", "Supreme Court", "Government", "government", "North Korea", "Bannon", "Senator", "senator", "Congress", "congress", "Senate", "senate", "Huckabee", "Lahren"];
SPOILER_WORDS_REGEX = new RegExp(SPOILER_WORDS_LIST.join("|"), "i");