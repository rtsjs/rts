// Constructor
function PriorityQ(compare) {
    this.data = [];
    this.compare = compare;
}
// interface goes into the prototype
PriorityQ.prototype = {
    push: function (element) {
        // Add the new element to the end of the array.
        this.data.push(element);
        // Allow it to bubble up.
        this._bubbleUp(this.data.length - 1);
    },

    pop: function () {
        // Store the first element so we can return it later.
        var first = this.data[0];
        // Get the element at the end of the array.
        var end = this.data.pop();
        // If there are any elements left, put the end element at the
        // start, and let it sink down.
        if (this.data.length > 0) {
            this.data[0] = end;
            this._sinkDown(0);
        }
        return first;
    },

    peek: function () {
        if (this.data.length > 0) {
            return this.data[0];
        }
        else return null;
    },

    size: function () {
        return this.data.length;
    },

    _bubbleUp: function (n) {
        // Fetch the element that has to be moved.
        var element = this.data[n];// score = this.scoreFunction(element);
        // When at 0, an element can not go up any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            var parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.data[parentN];
            // If the parent has a lesser score, things are in order and we
            // are done.
            if (this.compare(element, parent))
                break;

            // Otherwise, swap the parent with the current element and
            // continue.
            this.data[parentN] = element;
            this.data[n] = parent;
            n = parentN;
        }
    },

    _sinkDown: function (n) {
        // Look up the target element and its score.
        var length = this.data.length,
            element = this.data[n];
        //elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) * 2, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.data[child1N];
                //child1Score = this.scoreFunction(child1);
                // If the score is less than our element's, we need to swap.
                if (this.compare(element, child1))
                    swap = child1N;
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.data[child2N];
                //child2Score = this.scoreFunction(child2);
                if (this.compare((swap == null ? element : child1), child2))
                    swap = child2N;
            }

            // No need to swap further, we are done.
            if (swap == null) break;

            // Otherwise, swap and continue.
            this.data[n] = this.data[swap];
            this.data[swap] = element;
            n = swap;
        }
    }
};

