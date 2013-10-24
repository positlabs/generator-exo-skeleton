define(function(require, exports, module) {
		var _ = require("underscore");
		var $ = require("jquery");

		var GoogleAnalytics = function(document, window){
			var _this = this;
			this.accountLabels = 'abcdefg';
			this.accountIds = [];
			this.accounts = {};
			this.setAccounts = function(accounts){
				console.log("GoogleAnalytics."+"setAccounts()", arguments);
				_this.accountIds = accounts;
				_.each(accounts, function(accountId, i){
					var label = _this.accountLabels[i];
					_this.accounts[label] = accountId;
					window._gaq.push([label + "._setAccount", accountId]);
				});
				return _this;
			};
			this.trackPageview = function(args){
				_.each(_this.accounts, function(accountId, label){
					var _trackPageview = [label + "._trackPageview"];
					if (args[0]) _trackPageview.push(args[0]);
					window._gaq.push(_trackPageview);
				});
			};
			this.trackEvent = function(args){
				_.each(_this.accounts, function(accountId, label){
					var _trackEvent = [label + "._trackEvent"];
					window._gaq.push((_trackEvent.concat(args)));
				});
			};
			// Add the GA tag to stage
			(function() {
				window._gaq = [];
				window._gaq.push(['_setDomainName', 'none']);
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
				ga.onload = function(){
					var gaqpush = _gaq.push;
					window._gaq.push = function(args){
						console.log("\n***************************************************");
						console.log("google analytics: ", args.join( " | " ));
						console.log("***************************************************\n");
						gaqpush(args);
					}
				}
			})();
		};

		var Tracking = {
			trackers: {},
			init: function(){
				this.trackers.ga = new GoogleAnalytics(document, window);
				var id = "UA-XXXXXXX";
				// window.env == "dev" ? id += "2" : id += "1";
				this.trackers.ga.setAccounts([id]);
				this.trackPageview();
			},
			trackPageview: function(){
				var args = Array.prototype.slice.call(arguments, 0);
				_.each(this.trackers, function(tracker){
					tracker.trackPageview(args);
				});
			},
			trackEvent: function(){
				var args = Array.prototype.slice.call(arguments, 0);
				_.each(this.trackers, function(tracker){
					tracker.trackEvent(args);
				});
			}
		};
		return Tracking;
	}
);