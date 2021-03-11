let app = angular.module('app', []);
app.controller("bloggerController", ($scope, $http, $sce) => {
    $scope.posts = [];
    $scope.featuredPost = null;
    $scope.stripHtml = (html) => 
    {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    $scope.renderHtml = function (html_code) {
        return $sce.trustAsHtml(html_code);
    };
    $http.get(`https://public-api.wordpress.com/rest/v1/sites/namccreativelights.wordpress.com/posts`).then(res => {
        console.log(res.data);
        if (res.data && Array.isArray(res.data.posts)) {
            $scope.featuredPost = (res.data.posts.reverse())[0] || null;
            $scope.posts = res.data.posts
        }
    }).catch(err => {

    })
})