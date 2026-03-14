import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 — Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E40AF]">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">AssociO</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
              The smart platform for Owners Associations to manage their
              communities with clarity, efficiency, and transparency.
            </p>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Features</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Pricing</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Dashboard</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">API</p>
            </div>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4
              id="resources"
              className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
            >
              Company
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Help Center</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">About</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2026 AssociO. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-gray-400 hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="text-sm text-gray-400 hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
