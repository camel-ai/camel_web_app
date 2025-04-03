import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export interface ToolResponse {
  result: any;
}

export interface ToolInfo {
  name: string;
  description: string;
  methods: string[];
}

export const toolService = {
  async executeToolkit(toolName: string, params: Record<string, any>): Promise<ToolResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/tools/execute_tool/${toolName}`, params);
      return response.data;
    } catch (error) {
      console.error('Error executing tool:', error);
      throw error;
    }
  },

  async getAvailableTools(): Promise<string[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tools/available_tools`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available tools:', error);
      throw error;
    }
  },

  async getToolInfo(toolName: string): Promise<ToolInfo> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tools/tool_info/${toolName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tool info:', error);
      throw error;
    }
  }
}; 