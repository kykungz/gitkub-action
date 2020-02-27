"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = core.getInput('github-token', { required: true });
        const client = new github.GitHub(token);
        const prNumber = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number;
        if (!prNumber) {
            return console.log('Could not get pull request number from context, exiting');
        }
        yield client.issues.addLabels({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: prNumber,
            labels: ['Status: Ready for Review'],
        });
    }
    catch (error) {
        core.error(error);
        core.setFailed(error.message);
    }
});
run();
