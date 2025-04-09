# Recurrence Analysis -- Mystery Function

Analyze the running time of the following recursive procedure as a function of
$n$ and find a tight big $O$ bound on the runtime for the function. You may
assume that each operation takes unit time. You do not need to provide a formal
proof, but you should show your work: at a minimum, show the recurrence relation
you derive for the runtime of the code, and then how you solved the recurrence
relation.

```javascript
function mystery(n) {
    if(n <= 1)
        return;
    else {
        mystery(n / 3);
        var count = 0;
        mystery(n / 3);
        for(var i = 0; i < n*n; i++) {
            for(var j = 0; j < n; j++) {
                for(var k = 0; k < n*n; k++) {
                    count = count + 1;
                }
            }
        }
        mystery(n / 3);
    }
}
```

Add your answer to this markdown file. [This
page](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions)
might help with the notation for mathematical expressions.

## Runtime Complexity

From the code.js file, where I made some comments on the javascript in this
exercise, we can see that this program makes three recursive calls to itself,
in the form of "mystery(n / 3)", in which an (n / 3) subdivision of elements
are worked on. Giving us a recurrence relation of $3T(\frac{n}{3})$.  

Then we have the three for loops. The first for loop will run
while $i < n^2$, from $i = 0$, or $n^2$ times. The second for loop will run
while $j < n$, from $j = 0$, or $n$ times. The third for loop will run while
$k < n^2$, from $k = 0$, or $n^2$ times. This gives a total of of $n^2 \cdot
n \cdot n^2 = n^5$ iterations, during which count is incrimented once each
iteration. Giving us a time complexity of $O(n^5)$.  

Combining these terms we get $T(n) = 3T(\frac{n}{3}) + O(n^5)$. From here we
can work on solving our recurrence relation, $T(n) = 3T(\frac{n}{3}) + n^5$,
via iteration.  

| K | T(n) |
| - | ---- |
| 1 | $T(n) = 3T(\frac{n}{3}) + n^5$ |
| 2 | $T(n) = 3[3T(\frac{n}{3^2}) + (\frac{n}{3})^5] + n^5 = 3^2T(\frac{n}{3^2}) + 3(\frac{n}{3})^5 + n^5 = 3^2T(\frac{n}{3^2}) + \frac{n^5}{3^4} + n^5$ |
| 3 | $T(n) = 3^2[3T(\frac{n}{3^3}) + (\frac{n}{3^2})^5 + \frac{n^5}{3^4} + n^5 = 3^3T(\frac{n}{3^3}) + 3^2(\frac{n}{3^2})^5 + \frac{n^5}{3^4} + n^5 = 3^3T(\frac{n}{3^3}) + \frac{n^5}{3^8} + \frac{n^5}{3^4} + n^5$ |
| 4 | $T(n) = 3^3[3T(\frac{n}{3^4}) + (\frac{n}{3^3})^5] + \frac{n^5}{3^8} + \frac{n^5}{3^4} + n^5 = 3^4T(\frac{n}{3^4}) + 3^3(\frac{n}{3^3})^5 + \frac{n^5}{3^8} + \frac{n^5}{3^4} + n^5 = 3^4T(\frac{n}{3^4}) + \frac{n^5}{3^{12}} + \frac{n^5}{3^8} + \frac{n^5}{3^4} + n^5$ |

From the table above, after several iterations, we can see a pattern forming:  
$T(n) = 3^KT(\frac{n}{3^K}) + [\frac{n^5}{3^{4(K-1)}} + \frac{n^5}{3^{4(K-2)}} + ... + \frac{n^5}{3^4} + n^5]$  
Or generally, after K iterations:  
$T(n) = 3^KT(\frac{n}{3^K}) + n^5 \sum_{i=0}^{K-1} \frac{1}{3^{4i}}$  
This recursion terminates at:  
$\frac{n}{3^K} = 1 \implies n = 3^K \implies \log_{3} n = K$ or $K = \log_{3} n$  
Which gives us a recursive term of:  
$3^{\log_{3} n}T(1) = nT(1)$  
Which gives us a summation of:  
$n^5 \sum_{i=0}^{\log_{3} n-1} \frac{1}{3^{4i}$  
The ratio of our geometric series is less than 1, meaning this is a finite
geometric series, and for large values of n, its is mathematically
negligible, thus the $n^5$ term will dominate giving us:  
$T(n) \in O(n^5)$

## Sources

I referenced my work on an earlier assignment for phrasing:
https://github.com/COSC3020/divide-and-conquer-sum-Kodoka

## Plagiarism Notice

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
