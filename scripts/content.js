var $document, exileTraitorousSpoiler, first_feed_elem_text, incrementBadgeNumber, initialize, initiateSpoilerBlocking, num_feed_elems, searchForAndBlockSpoilers, settings;
first_feed_elem_text = null;
num_feed_elems = null;
this.smaller_font_mode = false;
settings = {
	show_specific_words: true,
	spoiler_words_regex: null,
	execute_trailors: false
};
$document = $(document);
$document.ready(function() {
	return chrome.runtime.sendMessage({
		userPreferencesRequested: true
	}, (function(_this) {
		return function(response) {
			var extra_words_to_block;
			settings.show_specific_words = response.showSpecificWordEnabled;
			settings.execute_trailors = response.destroySpoilers;
			extra_words_to_block = response.extraWordsToBlock.split(',').map(function(word) {
				return word.trim().escapeRegex();
			}).filter(function(word) {
				return !!word;
			});
			settings.spoiler_words_regex = new RegExp(SPOILER_WORDS_LIST.concat(extra_words_to_block).join('|'), 'i');
			if (response.blockingEnabled) {
				return initialize();
			}
		};
	})(this));
});
incrementBadgeNumber = function() {
	return chrome.runtime.sendMessage({
		incrementBadge: true
	}, (function() {}));
};
initiateSpoilerBlocking = function(selector_string, remove_parent) {
	searchForAndBlockSpoilers(selector_string, true, remove_parent);
	return $document.mousemove(function() {
		return debounce(function() {
			return searchForAndBlockSpoilers(selector_string, false, remove_parent);
		});
	});
};
searchForAndBlockSpoilers = (function(_this) {
	return function(feed_elements_selector, force_update, remove_parent) {
		var $new_feed_elems, new_first_text, new_length;
		$new_feed_elems = $(feed_elements_selector);
		if (remove_parent) {
			$new_feed_elems = $new_feed_elems.parent();
		}
		if ($new_feed_elems.length === 0) {
			return;
		}
		new_length = $new_feed_elems.length;
		new_first_text = $new_feed_elems.first()[0].textContent;
		if (force_update || (new_length !== num_feed_elems) || (new_first_text !== first_feed_elem_text)) {
			cl("Updating potential spoilers, previously '" + num_feed_elems + "', now '" + new_length + "'.");
			first_feed_elem_text = new_first_text;
			num_feed_elems = new_length;
			return $new_feed_elems.each(function() {
				var matchedSpoiler;
				if (this.className.search(/true-and-leal|glamoured/) > -1) {
					return;
				}
				matchedSpoiler = this.textContent.match(settings.spoiler_words_regex);
				if (matchedSpoiler === null) {
					return addClass(this, 'true-and-leal');
				} else {
					return exileTraitorousSpoiler($(this), matchedSpoiler[0]);
				}
			});
		}
	};
})(this);
exileTraitorousSpoiler = function($traitor, dark_words_of_spoilage) {
	var $glamour, capitalized_spoiler_words, glamour_string, specific_words;
	incrementBadgeNumber();
	if (settings.execute_trailors) {
		$traitor.remove();
		return;
	}
	capitalized_spoiler_words = dark_words_of_spoilage.capitalizeFirstLetter();
	$traitor.addClass('glamoured');
	glamour_string = "<div class='spoiler-glamour " + (this.smaller_font_mode ? 'small' : '') + "'> <h3 class='spoiler-obituary'>This is a political post" + " <h3 class='click-to-view-spoiler' >Click to show post</h3> </div>";
	$(glamour_string).appendTo($traitor);
	$glamour = $traitor.find('.spoiler-glamour');
	return $glamour.on('click', function(ev) {
		var specific_words_for_confirm;
		ev.stopPropagation();
		ev.preventDefault();
		$glamour.addClass('revealed');
		return setTimeout((function() {
			return $glamour.remove();
		}), 3500);
	});
};
initialize = (function(_this) {
	return function() {
		var url;
		url = window.location.href.toLowerCase();
		if (url.indexOf('facebook') > -1) {
			return initiateSpoilerBlocking(FACEBOOK_FEED_ELEMENTS_SELECTOR);
		}
	};
})(this);