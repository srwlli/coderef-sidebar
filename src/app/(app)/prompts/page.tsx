import { CollapsiblePrompt } from '@/components/collapsibles';
import { MessageSquare } from 'lucide-react';

export default function PromptsPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <CollapsiblePrompt
          title="Code Review Assistant"
          description="A comprehensive prompt for reviewing code quality, performance, and best practices"
          content="Please review this code and provide feedback on:

1. Code quality and readability
2. Performance optimizations
3. Security considerations
4. Best practices adherence
5. Potential bugs or issues
6. Suggestions for improvement

Focus on constructive feedback that helps improve the codebase while maintaining functionality."
        />

        <CollapsiblePrompt
          title="Bug Analysis & Debugging"
          description="Systematic approach to identifying and fixing bugs in code"
          content="Please analyze this code for bugs and issues:

1. Identify potential runtime errors
2. Check for logical inconsistencies
3. Look for edge cases that might fail
4. Examine error handling and validation
5. Suggest debugging strategies
6. Provide fix recommendations

Include step-by-step debugging approach and preventive measures for similar issues."
        />

        <CollapsiblePrompt
          title="Documentation Generator"
          description="Generate comprehensive documentation for code components and functions"
          content="Please create documentation for this code:

1. Write clear function/component descriptions
2. Document all parameters and return types
3. Provide usage examples
4. List any dependencies or requirements
5. Include edge cases and error scenarios
6. Add inline comments for complex logic

Format as markdown with proper headings and code blocks for easy integration."
        />

        <CollapsiblePrompt
          title="Performance Optimization"
          description="Analyze and suggest performance improvements for code efficiency"
          content="Please analyze this code for performance optimization:

1. Identify performance bottlenecks
2. Suggest algorithmic improvements
3. Review memory usage patterns
4. Check for unnecessary computations
5. Recommend caching strategies
6. Analyze database query efficiency
7. Suggest profiling approaches

Provide specific optimization recommendations with expected impact measurements."
        />
      </main>
    </div>
  );
}
