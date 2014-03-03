# angular-step #

An AngularJS module for building step-by-step multi-page forms (e.g. a "wizard").
I made this because I once had to build out a bunch of multi-page forms and I tried
to re-use some of the components.  This only made things complicated when I had to
keep track of which form was in use and how the buttons should respond.  

I created this as a cleaner alternative to use in future projects.

Here is a quick example:

    <stepset next-text="Next" previous-text="Previous" submit-text="Submit">
        <step>
            <p>This is the first step</p>
        </step>
        
        <step title="This one has an optional title">
            <p>Some contents here.</p>
        </step>
          
        <step title="This one has an optional title..." description="and some text" />
          
        <step title="Partials are okay">
            <div ng-include="'partials/step_partial.html'">
        </step>
    </stepset>

Licensed under the MIT License.  
