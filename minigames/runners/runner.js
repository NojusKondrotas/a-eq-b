export var AlgorithmState;
(function (AlgorithmState) {
    AlgorithmState[AlgorithmState["currentIter"] = 1] = "currentIter";
    AlgorithmState[AlgorithmState["nextIter"] = 2] = "nextIter";
    AlgorithmState[AlgorithmState["terminate"] = 3] = "terminate";
})(AlgorithmState || (AlgorithmState = {}));
