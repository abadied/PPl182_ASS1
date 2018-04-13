import * as ramda from 'ramda'

declare var require: any;
const assert = require('assert').strict;

let pre_str: string = 'pre';
let post_str: string = 'post';
let in_str: string = 'in';

interface BinTree {
    root: number;
    left? : BinTree;
    right?: BinTree;
};

interface GBinTree<T> { 
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

const TreePreArray: (b_tree: BinTree) => Array<number> = function(b_tree: BinTree): Array<number> {
    let arr:Array<number> = GetArray(b_tree, [], pre_str);
    return arr;
};

const TreeInArray: (b_tree: BinTree) => Array<number> = function(b_tree: BinTree): Array<number> {
    let arr:Array<number> = GetArray(b_tree, [], in_str);
    return arr;
};

const TreePostArray: (b_tree: BinTree) => Array<number> = function(b_tree: BinTree): Array<number> {
    let arr:Array<number> = GetArray(b_tree, [], post_str);
    return arr;
};

const GBinTreePreArray: <T>(b_tree: GBinTree<T>) => Array<T> = function<T>(b_tree: GBinTree<T>): Array<T> {
    let arr:Array<T> = GBinGetArray(b_tree, [], pre_str);
    return arr;
};

const GBinTreeInArray: <T>(b_tree: GBinTree<T>) => Array<T> = function<T>(b_tree: GBinTree<T>): Array<T> {
    let arr:Array<T> = GBinGetArray(b_tree, [], in_str);
    return arr;
};

const GBinTreePostArray: <T>(b_tree: GBinTree<T>) => Array<T> = function<T>(b_tree: GBinTree<T>): Array<T> {
    let arr:Array<T> = GBinGetArray(b_tree, [], post_str);
    return arr;
};

const GetArray: (b_tree: BinTree, pre_array: Array<number>, print_type: string) => Array<number> =
 function(b_tree: BinTree, pre_array: Array<number>, print_type: string): Array<number> {
    if (b_tree != undefined && b_tree.root != undefined) {
        if(print_type === pre_str) {
            pre_array.push(b_tree.root);
            pre_array = GetArray(b_tree.left, pre_array, pre_str);
            pre_array = GetArray(b_tree.right, pre_array, pre_str);
        }

        if(print_type === in_str) {
            pre_array = GetArray(b_tree.left, pre_array, in_str);
            pre_array.push(b_tree.root);
            pre_array = GetArray(b_tree.right, pre_array, in_str);
        }

        if(print_type === post_str) {
            pre_array = GetArray(b_tree.left, pre_array, post_str);
            pre_array = GetArray(b_tree.right, pre_array, post_str);
            pre_array.push(b_tree.root);
        }
    }
    return pre_array;
};

const GBinGetArray: <T>(b_tree: GBinTree<T>, pre_array: Array<T>, print_type: string) => Array<T> =
 function<T>(b_tree: GBinTree<T>, pre_array: Array<T>, print_type: string): Array<T> {
    if (b_tree != undefined && b_tree.root != undefined) {
        if(print_type === pre_str) {
            pre_array.push(b_tree.root);
            pre_array = GBinGetArray(b_tree.left, pre_array, pre_str);
            pre_array = GBinGetArray(b_tree.right, pre_array, pre_str);
        }

        if(print_type === in_str) {
            pre_array = GBinGetArray(b_tree.left, pre_array, in_str);
            pre_array.push(b_tree.root);
            pre_array = GBinGetArray(b_tree.right, pre_array, in_str);
        }

        if(print_type === post_str) {
            pre_array = GBinGetArray(b_tree.left, pre_array, post_str);
            pre_array = GBinGetArray(b_tree.right, pre_array, post_str);
            pre_array.push(b_tree.root);
        }
    }
    return pre_array;
};

let tree1: BinTree = {
    root:4
};

let tree2: BinTree = {
    root: 5, left: tree1
};

let tree3: BinTree = {
    root: 6, left:tree1, right:tree2
};

let g_tree1: GBinTree<string> = {
    root: '4'
};

let g_tree2: GBinTree<string> = {
    root: '5', left: g_tree1
};

let g_tree3: GBinTree<string> = {
    root: '6', left:g_tree1, right:g_tree2
};

//tests for BinTree
assert.deepEqual(TreePreArray(tree1), [4], "failed test1!");
assert.deepEqual(TreePostArray(tree1), [4], "failed test1!");
assert.deepEqual(TreeInArray(tree1), [4], "failed test1!");
assert.deepEqual(TreePreArray(tree2), [5, 4], "failed test2!");
assert.deepEqual(TreePostArray(tree2), [4, 5], "failed test2!");
assert.deepEqual(TreeInArray(tree2), [4, 5], "failed test2!");
assert.deepEqual(TreePreArray(tree3), [6, 4, 5, 4], "failed test3!");
assert.deepEqual(TreePostArray(tree3), [4, 4, 5 ,6], "failed test3!");
assert.deepEqual(TreeInArray(tree3), [4, 6, 4, 5], "failed test3!");

//tests for GBinTree
assert.deepEqual(GBinTreePreArray(tree1), [4], "failed test1!");
assert.deepEqual(GBinTreePostArray(tree1), [4], "failed test1!");
assert.deepEqual(GBinTreeInArray(tree1), [4], "failed test1!");
assert.deepEqual(GBinTreePreArray(tree2), [5, 4], "failed test2!");
assert.deepEqual(GBinTreePostArray(tree2), [4, 5], "failed test2!");
assert.deepEqual(GBinTreeInArray(tree2), [4, 5], "failed test2!");
assert.deepEqual(GBinTreePreArray(tree3), [6, 4, 5, 4], "failed test3!");
assert.deepEqual(GBinTreePostArray(tree3), [4, 4, 5 ,6], "failed test3!");
assert.deepEqual(GBinTreeInArray(tree3), [4, 6, 4, 5], "failed test3!");

assert.deepEqual(GBinTreePreArray(g_tree1), ['4'], "failed test1!");
assert.deepEqual(GBinTreePostArray(g_tree1), ['4'], "failed test1!");
assert.deepEqual(GBinTreeInArray(g_tree1), ['4'], "failed test1!");
assert.deepEqual(GBinTreePreArray(g_tree2), ['5', '4'], "failed test2!");
assert.deepEqual(GBinTreePostArray(g_tree2), ['4', '5'], "failed test2!");
assert.deepEqual(GBinTreeInArray(g_tree2), ['4', '5'], "failed test2!");
assert.deepEqual(GBinTreePreArray(g_tree3), ['6', '4', '5', '4'], "failed test3!");
assert.deepEqual(GBinTreePostArray(g_tree3), ['4', '4', '5','6'], "failed test3!");
assert.deepEqual(GBinTreeInArray(g_tree3), ['4', '6', '4', '5'], "failed test3!");


//subsets part
const KSubsets: <T>(obj_arr: Array<T>, k:number) => Array<Array<T>> = function<T>(obj_arr: Array<T>, k:number): Array<Array<T>> {
    let k_subsets:Array<Array<T>> = GetKSubsets(obj_arr, k, [],[]);
    return k_subsets;
}; 

const AllSubsets: <T>(obj_arr: Array<T>) => Array<Array<T>> = function<T>(obj_arr: Array<T>): Array<Array<T>> {
    let subsets:Array<Array<T>> = [];
    for (let _i = 0; _i <= obj_arr.length; _i++){
        let k_subsets:Array<Array<T>> = GetKSubsets(obj_arr, _i, [],[]);
        subsets = subsets.concat(k_subsets);
    }
    return subsets;
}; 

const GetKSubsets: <T>(obj_arr: Array<T>, k:number, curr_set: Array<T>, subsets:Array<Array<T>>) => Array<Array<T>>
 = function<T>(obj_arr: Array<T>, k:number, curr_set: Array<T>, subsets:Array<Array<T>>): Array<Array<T>> {
    let counter:number =0;
    for (let obj of obj_arr) {
        counter++;
        let loc_curr_set:Array<T>=curr_set.slice(0,curr_set.length);
        loc_curr_set.push(obj);
        if ( k === 0){
            subsets.push(curr_set);
            break;
        }
        else if (k === 1) {
            subsets.push(loc_curr_set);
        }
        else if(obj_arr.length >= k){
            let obj_arr_cpy:Array<T> = obj_arr.slice(counter,obj_arr.length);
            let curr_set_cpy:Array<T> = loc_curr_set;
            GetKSubsets(obj_arr_cpy, k - 1, curr_set_cpy, subsets);
        }
    }
    return subsets;
    
};

assert.deepEqual(KSubsets([1,2,3],0), [[]], "failed test0!");
assert.deepEqual(KSubsets([1,2,3],1), [[1],[2],[3]], "failed test1!");
assert.deepEqual(KSubsets([1,2,3],2), [[1,2],[1,3],[2,3]], "failed test2!");
assert.deepEqual(KSubsets([1,2,3],3), [[1,2,3]], "failed test3!");
assert.deepEqual(KSubsets([1,2,3],4), [], "failed test4!");
assert.deepEqual(AllSubsets([1, 2, 3]),[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]], "failed test5!")


// flatmap part

const flatmap: <T1, T2>(func: Function, unflat_arr: Array<T1>) => Array<T2> = function<T1,T2>(func: Function, unflat_arr: Array<T1>): Array<T2> {
    let flat_array: Array<T2> = [];
    for(let curr_obj of unflat_arr){
        let func_res: Array<T2> = func(curr_obj);
        flat_array = flat_array.concat(func_res);
    }
    return flat_array;
};
assert.deepEqual(flatmap((x)=>x[0], [[[1,2],[3,4]],[[5,6],[7,8]]]),[ 1, 2, 5, 6 ],"failed test1! -> the result should be: [ 1, 2, 5, 6 ]");
assert.deepEqual(flatmap((x)=>x+2,[1,4,6,8]),[ 3, 6, 8, 10 ],"failed test1! -> the result should be: [ 3, 6, 8, 10 ]");
assert.deepEqual(flatmap((x)=>x[0]*x[0],[[1,2],[3,4],[5,6],[7,8]]),[ 1, 9, 25, 49 ],"failed test1! -> the result should be: [ 1, 9, 25, 49 ]");
//function add5(a:number): number {return a+5;}

interface movie {
    name: string;
    videos: Array<videos>;
};

interface videos{
    id: number;
    title: string;
    boxarts: Array<boxart>;
    url: string;
    rating: number;
    bookmark: {id? : number, time?: number}[];
};

interface changed_videos{
    id: number;
    title: string;
    boxarts: string;
};

interface boxart {
    width: number;
    height: number;
    url: string;
};

const getBoxarts: (movielist: Array<movie>) => Array<changed_videos> = function(movielist: Array<movie>): Array<changed_videos> {
    let curr_list: Array<videos> = flatmap((x)=>x.videos, movielist);
    let new_list: Array<changed_videos> = ramda.map(extractRelevantVideos, curr_list);
    return new_list;
};

const extractRelevantVideos: (video: videos) => changed_videos = function(video: videos): changed_videos {
    let rel_boxarts: boxart = ramda.filter(check_resolution, video.boxarts).pop();
    let new_video: changed_videos = {
        id: video.id,
        title: video.title,
        boxarts: rel_boxarts.url
    };
    return new_video;
};

const check_resolution: (box: boxart) => boolean = function(box: boxart): boolean {
    return (box.width === 150 && box.height === 200 );
};

let movielist1: Array<movie> = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
];



let movielist2: Array<movie> = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": []
                
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    
];

let movielist3: Array<movie> = [];

let movielist1_res: Array<changed_videos> = [ { id: 70111470,
    title: 'Die Hard',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
  { id: 654356453,
    title: 'Bad Boys',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
  { id: 65432445,
    title: 'The Chamber',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
  { id: 675465,
    title: 'Fracture',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' } ];

let movielist2_res: Array<changed_videos> = [ { id: 70111470,
    title: 'Die Hard',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
  { id: 654356453,
    title: 'Bad Boys',
    boxarts: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' }];

let movielist3_res: Array<changed_videos> = [];

assert.deepEqual(getBoxarts(movielist1), movielist1_res,"faild test1 of get boxarts!");
assert.deepEqual(getBoxarts(movielist2),movielist2_res,"faild test2 of get boxarts!");
assert.deepEqual(getBoxarts(movielist3),movielist3_res,"faild test3 of get boxarts!");
