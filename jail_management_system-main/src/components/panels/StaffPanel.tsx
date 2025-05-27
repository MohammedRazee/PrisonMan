
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Staff {
  id: string;
  name: string;
  employeeId: string;
  position: string;
  department: string;
  shift: 'Day' | 'Night' | 'Rotating';
  status: 'Active' | 'On Leave' | 'Inactive';
  hireDate: string;
  phone: string;
}

const StaffPanel = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: '1',
      name: 'Officer Mike Johnson',
      employeeId: 'EMP001',
      position: 'Security Officer',
      department: 'Security',
      shift: 'Day',
      status: 'Active',
      hireDate: '2023-03-15',
      phone: '(555) 123-4567',
    },
    {
      id: '2',
      name: 'Dr. Sarah Wilson',
      employeeId: 'EMP002',
      position: 'Medical Officer',
      department: 'Medical',
      shift: 'Day',
      status: 'Active',
      hireDate: '2023-05-20',
      phone: '(555) 987-6543',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    position: '',
    department: '',
    shift: 'Day' as 'Day' | 'Night' | 'Rotating',
    phone: '',
    status: 'Active' as 'Active' | 'On Leave' | 'Inactive',
  });

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.position || !newStaff.department || !newStaff.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const staffMember: Staff = {
      id: Date.now().toString(),
      employeeId: `EMP${String(staff.length + 1).padStart(3, '0')}`,
      name: newStaff.name,
      position: newStaff.position,
      department: newStaff.department,
      shift: newStaff.shift,
      phone: newStaff.phone,
      status: newStaff.status,
      hireDate: new Date().toISOString().split('T')[0],
    };

    setStaff([...staff, staffMember]);
    setNewStaff({ name: '', position: '', department: '', shift: 'Day', phone: '', status: 'Active' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Staff member added successfully",
    });
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter(member => member.id !== id));
    toast({
      title: "Success",
      description: "Staff member removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Staff Management</h2>
          <p className="text-slate-600">Manage staff members and assignments</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              Add New Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter the staff member's information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newStaff.position}
                  onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                  placeholder="e.g., Security Officer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newStaff.department} onValueChange={(value) => setNewStaff({ ...newStaff, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Kitchen">Kitchen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Select value={newStaff.shift} onValueChange={(value: 'Day' | 'Night' | 'Rotating') => setNewStaff({ ...newStaff, shift: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day">Day</SelectItem>
                    <SelectItem value="Night">Night</SelectItem>
                    <SelectItem value="Rotating">Rotating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddStaff}>Add Staff Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <span className="text-slate-600">Total: {staff.length} staff members</span>
      </div>

      <div className="grid gap-4">
        {filteredStaff.map((member) => (
          <Card key={member.id} className="bg-white border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.position} • {member.department}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'Active' ? 'bg-green-100 text-green-800' :
                    member.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteStaff(member.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Employee ID:</span>
                  <p>{member.employeeId}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Shift:</span>
                  <p>{member.shift}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Hire Date:</span>
                  <p>{member.hireDate}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Phone:</span>
                  <p>{member.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No staff members found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default StaffPanel;
