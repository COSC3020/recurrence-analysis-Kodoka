function mystery(n)
{
    // If n <= 1, return, we're done, return. n will be <= 1 if previous n < 3
    if(n <= 1)
    {
        return;
    }
    else
    {
        // Recursive call, with n / 3, base case if n < 3
        mystery(n / 3);
        var count = 0;
        // Recursive call, with n / 3, base case if n < 3
        mystery(n / 3);
        // For i < n^2...
        for(var i = 0; i < n*n; i++)
        {
            // Then for j < n, which is i < n^2 * n == i < n^3
            for(var j = 0; j < n; j++)
            {
                // Then for k < n^2, which is i < n^2 * n * n^2 == i < n^5
                for(var k = 0; k < n*n; k++)
                {
                    // Incriment count by 1.
                    count = count + 1;
                }
            }
        }
        // Recursive call, with n / 3, base case if n < 3
        mystery(n / 3);
    }
}