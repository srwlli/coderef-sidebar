# Current Context

```xml
<project_context>
  <atomic_workflow_instructions>
    <overview>
      <description>Step-by-step atomic development process with complete tracking</description>
      <principle>One file, one change, one step at a time</principle>
      <documentation_required>true</documentation_required>
    </overview>

    <step_process>
      <step_sequence>
        <step number="1" name="announce">
          <action>State step number and description</action>
          <required_elements>
            <element>Step number and description</element>
            <element>Explain WHY this step is needed</element>
            <element>Reference what it connects to or enables</element>
          </required_elements>
        </step>

        <step number="2" name="update_todo_status">
          <action>Mark current step as in_progress</action>
          <required_elements>
            <element>Use TodoWrite tool</element>
            <element>Set current step status to "in_progress"</element>
            <element>Keep other steps as "pending"</element>
          </required_elements>
        </step>

        <step number="3" name="execute_action">
          <action>Create or modify the specific file</action>
          <constraints>
            <constraint>Use minimal, atomic changes only</constraint>
            <constraint>One file or directory per step</constraint>
            <constraint>No complex multi-file operations</constraint>
          </constraints>
        </step>

        <step number="4" name="mark_todo_complete">
          <action>Update todo status to completed</action>
          <required_elements>
            <element>Use TodoWrite tool</element>
            <element>Set current step status to "completed"</element>
            <element>Verify next step is ready</element>
          </required_elements>
        </step>

        <step number="5" name="update_context_document">
          <action>MANDATORY: Update docs/CURRENT_CONTEXT.md with step details</action>
          <file_location>docs/CURRENT_CONTEXT.md</file_location>
          <required_updates>
            <update_1>
              <description>Add new step entry at TOP of build_log XML section</description>
              <xml_format>
                <step number="X" status="completed">
                  <description>Brief description of what was done</description>
                  <file_created>Exact file path created or modified</file_created>
                  <why>Explanation of why this step was needed</why>
                  <result>What this step accomplished or enabled</result>
                </step>
              </xml_format>
              <location>Inside build_log XML section, at the very top</location>
            </update_1>
            <update_2>
              <description>Update current_step number in agent_instructions</description>
              <action>Increment current_step to next step number</action>
            </update_2>
            <update_3>
              <description>Update next_action in agent_instructions</description>
              <action>Set next_action to description of upcoming step</action>
            </update_3>
          </required_updates>
          <mandatory>true</mandatory>
          <tool_required>Edit tool to modify docs/CURRENT_CONTEXT.md</tool_required>
        </step>

        <step number="6" name="confirm_next">
          <action>State completion and announce next step</action>
          <required_elements>
            <element>Confirm what was accomplished</element>
            <element>Announce next step is ready</element>
            <element>Wait for user approval to proceed</element>
          </required_elements>
        </step>
      </step_sequence>
    </step_process>

    <completion_criteria>
      <requirement>One atomic change made</requirement>
      <requirement>Todo status updated via TodoWrite</requirement>
      <requirement>Context document EXPLICITLY updated with Edit tool</requirement>
      <requirement>XML structure properly maintained in context document</requirement>
      <requirement>Next step clearly identified</requirement>
      <requirement>User approval received before proceeding</requirement>
    </completion_criteria>

    <context_document_update_rules>
      <mandatory_action>MUST use Edit tool on docs/CURRENT_CONTEXT.md after every step</mandatory_action>
      <rule>Always add new step XML at TOP of build_log section</rule>
      <rule>Use reverse chronological order (latest first)</rule>
      <rule>Include all required XML fields: number, status, description, file_created, why, result</rule>
      <rule>Update current_step number in agent_instructions section</rule>
      <rule>Update next_action in agent_instructions section</rule>
      <rule>Never skip context document update</rule>
    </context_document_update_rules>

    <constraints>
      <constraint>Never skip steps in the sequence</constraint>
      <constraint>Never make multiple file changes in one step</constraint>
      <constraint>Always explain WHY before executing</constraint>
      <constraint>ALWAYS update context document with Edit tool - this is mandatory</constraint>
      <constraint>Always wait for user approval between steps</constraint>
    </constraints>

    <error_handling>
      <if_step_fails>
        <action>Mark step as failed in todo</action>
        <action>Log failure reason in context document</action>
        <action>Add error classification XML to failed step</action>
        <action>Wait for user guidance before proceeding</action>
      </if_step_fails>
      <if_user_rejects_step>
        <action>Stop immediately</action>
        <action>Wait for revised instructions</action>
        <action>Do not proceed to next step</action>
      </if_user_rejects_step>
      <error_classification_required>
        <mandatory>true</mandatory>
        <xml_format>
          <error_classification>
            <type>ERROR_TYPE</type>
            <category>error_category</category>
            <severity>blocker|high|medium|low</severity>
            <root_cause>root_cause_description</root_cause>
            <required_action>next_action_needed</required_action>
            <lesson_learned>what_to_do_differently</lesson_learned>
          </error_classification>
        </xml_format>
        <error_types>
          <type>DEPENDENCY_ORDER_ERROR</type>
          <type>FILE_MISSING_ERROR</type>
          <type>IMPORT_ERROR</type>
          <type>SYNTAX_ERROR</type>
          <type>CONFIGURATION_ERROR</type>
          <type>PERMISSION_ERROR</type>
          <type>NETWORK_ERROR</type>
        </error_types>
        <categories>
          <category>build_process</category>
          <category>file_system</category>
          <category>network</category>
          <category>configuration</category>
          <category>dependencies</category>
        </categories>
      </error_classification_required>
    </error_handling>
  </atomic_workflow_instructions>

  <agent_instructions>
    <current_step>4</current_step>
    <next_action>Sidebar navigation improvements completed - ready for next task</next_action>
  </agent_instructions>

  <architectural_decisions>
    <ui_patterns>
      <sidebar_navigation>
        <icon_consistency>Sidebar icons now match dashboard card icons for visual coherence (Projects: FolderOpen)</icon_consistency>
        <layout_hierarchy>Settings separated to footer with divider - establishes pattern for secondary navigation items</layout_hierarchy>
        <component_usage>Uses SidebarFooter + SidebarSeparator pattern - reusable for other secondary items</component_usage>
      </sidebar_navigation>
      <icon_management>
        <primary_library>Lucide React - 70+ components using it, established as standard</primary_library>
        <conflict_resolution>Resolved icon.svg conflicts by removing public/icon.svg, keeping app/icon.svg route</conflict_resolution>
        <duplicate_prevention>Projects/Forms no longer share FileText - each navigation item has unique icon</duplicate_prevention>
      </icon_management>
    </ui_patterns>
  </architectural_decisions>

  <current_state>
    <navigation_structure>
      <main_items>Dashboard(Home), Projects(FolderOpen), Noted(StickyNote), Prompts(MessageSquare), AI Tools(Bot), Forms(FileText)</main_items>
      <footer_items>Settings(Cog) - separated with divider</footer_items>
      <pattern>Content area for primary nav, Footer for secondary/settings</pattern>
    </navigation_structure>
    <known_issues>
      <resolved>Icon conflicts, duplicate icons, settings placement</resolved>
      <monitoring>Watch for future icon conflicts when adding navigation items</monitoring>
    </known_issues>
  </current_state>

  <agent_guidance>
    <when_adding_nav_items>
      <primary_nav>Add to menuItems array, ensure unique icon from lucide-react</primary_nav>
      <secondary_nav>Consider footer placement for settings-like items</secondary_nav>
      <icon_selection>Check dashboard consistency, avoid duplicates</icon_selection>
    </when_adding_nav_items>
    <ui_consistency>
      <follow_patterns>SidebarFooter + SidebarSeparator for secondary items</follow_patterns>
      <icon_source>Lucide React is established standard</icon_source>
      <layout_file>src/app/(app)/layout.tsx contains main navigation structure</layout_file>
    </ui_consistency>
  </agent_guidance>

</project_context>
```
