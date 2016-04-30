/**
 * Scroll.js
 *
 * A utility to permit infinite scrolling. Conserves memory
 * usage by removing invisible elements from the DOM.
 */

var Scroll = function(card_func) {
    this.disappearanceBuffer = 100; // Number of pixels above top of page before removing a card
    this.initialCardCount = 5, // How many cards to init the environment with

    this.container = $('.container'),
    this.filler = $('.filler'),

    // Counter to track number of cards we've seen
    this.cardsThroughDom = 0,

    // Initialization function
    this.init = function() {
        var self = this;

        // Page scroll event
        $(window).scroll(function() {
            $('.card').each(function() {
                var bottom = (this.offsetTop + this.offsetHeight);
                if (bottom < window.pageYOffset - self.disappearanceBuffer) {
                    // Add a new element at the bottom of the page
                    self.container.append(self.newCard());
                    // Stretch out filter above to compensate
                    self.stretchFiller(this.offsetHeight + 30);
                    // Delete offscreen element
                    $(this).remove();
                }
            });
        });

        // Load the DOM with cards
        for (var i = 0; i < this.initialCardCount; i++) {
            this.container.append(self.newCard());
        }

        return this;
    },

    // Creates a new card
    this.newCard = function() {
        this.cardsThroughDom++;
        return this.newCardSub();
    },
    this.newCardSub = function() {
        return "<div class=\"card\" data-count=\"" + this.cardsThroughDom + "\"></div>";
    },

    // Stretches the page filler
    this.stretchFiller = function(height) {
        var current_height = this.filler.height();
        this.filler.height(current_height + height);
    };

    // Replace the new card generator if applicable
    if (typeof card_func === 'function') {
        this.newCardSub = card_func;
    }

    return this.init();
};
