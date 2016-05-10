// From http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
var _tmplCache = {}
this.parseTemplate = function(str, data) {
    /// <summary>
    /// Client side template parser that uses &lt;#= #&gt; and &lt;# code #&gt; expressions.
    /// and # # code blocks for template expansion.
    /// </summary>
    /// <param name="str" type="string">The text of the template to expand</param>    
    /// <param name="data" type="var">
    /// Any data that is to be merged. Pass an object and
    /// that object's properties are visible as variables.
    /// </param>    
    /// <returns type="string" />  
    var err = "";
    try {
        var func = _tmplCache[str];
        if (!func) {
            var strFunc =
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                    "with(obj){p.push('" +
                    str.replace(/[\r\t\n]/g, " ")
                        .replace(/'(?=[^#]*#>)/g, "\t")
                        .split("'").join("\\'")
                        .split("\t").join("'")
                        .replace(/<#=(.+?)#>/g, "',$1,'")
                        .split("<#").join("');")
                        .split("#>").join("p.push('")
                    + "');}return p.join('');";

            //console.log(strFunc);
            func = new Function("obj", strFunc);
            _tmplCache[str] = func;
        }
        return func(data);
    } catch (e) { err = e.message; }
    return "< # ERROR: " + err + " # >";
}